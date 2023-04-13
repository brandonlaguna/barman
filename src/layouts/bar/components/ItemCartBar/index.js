import { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import { useMaterialUIController } from "context";
import {
  useBarCartController,
  deleteToCart,
  setLaunchPrinter,
  clean,
  updateItemCart,
} from "context/barCartContext";
import { useSelectorController, setIsLoading } from "context/selectorContext";
import { toast } from "react-toastify";
import useWindowDimensions from "functions/windowDimension";
import { SwipeableList } from "@sandstreamdev/react-swipeable-list";
import generateTransaction from "transactions/generateTransaction";
import "@sandstreamdev/react-swipeable-list/dist/styles.css";
import calculateTotal from "functions/calculateTotal";
import printTransaction from "transactions/printTransaction";
import { BANK_ICONS } from "config/contants";
import { importAllUsers } from "services/userServices";
import CircleButton from "components/MDCircleButton";
import ItemCartCard from "./components/ItemCartCard";
import PaymentButton from "./components/PaymentButton";
import ModalItemSetting from "./components/Modals/ModalItemSetting";
import ModalUserAuthorization from "./components/Modals/ModalUserAuthorization";
import { ItemCartBarStyle } from "./style";

const buttonIconStyle = {
  width: "23px",
  height: "23px",
  color: "white",
  filter: "invert(90%) sepia(21%) saturate(95%) hue-rotate(100deg) brightness(100%) contrast(100%)",
};

function RenderIdTable({ tableSelected }) {
  const [controllerBar, dispatchBar] = useBarCartController();
  const { listCarts } = controllerBar;
  const [listUsers, setListUsers] = useState([]);
  const [isOpenModalUserAuth, setIsOpenModalUserAuth] = useState(false);

  const handleClickUserAuth = () => {
    importAllUsers().then((response) => {
      setListUsers(response.data);
      setIsOpenModalUserAuth(true);
    });
  };

  const handleOnForceCloseUserAuth = () => setIsOpenModalUserAuth(false);
  return (
    <Box style={{ marginBottom: "6px" }}>
      {tableSelected && (
        <>
          <Grid container>
            <Grid item xs={9} sm={9} md={9}>
              <Typography
                id="modal-modal-title"
                variant="p"
                component="div"
                style={{ color: "white", fontSize: 13 }}
              >
                Pedido Mesa # {tableSelected} ({listCarts.length} items)
              </Typography>
            </Grid>
            <Grid item xs={1} sm={1} md={1}>
              <CircleButton
                iconPath={`${BANK_ICONS}/interface/duster.svg`}
                sx={{ width: "35px", height: "35px" }}
                sxIcon={buttonIconStyle}
                onClick={() => clean(dispatchBar, true)}
              />
            </Grid>
            <Grid item xs={2} sm={2} md={2}>
              <CircleButton
                iconPath={`${BANK_ICONS}/interface/bin.svg`}
                sx={{ width: "35px", height: "35px" }}
                sxIcon={buttonIconStyle}
                onClick={() => handleClickUserAuth()}
              />
            </Grid>
          </Grid>
          <ModalUserAuthorization
            isOpen={isOpenModalUserAuth}
            handleOnForceClose={handleOnForceCloseUserAuth}
            dataUser={listUsers}
          />
        </>
      )}
    </Box>
  );
}

export default function ItemCartBar() {
  // context controllers
  const [controller] = useMaterialUIController();
  const [controllerBar, dispatchBar] = useBarCartController();
  const [controllerSelector, dispatchSelector] = useSelectorController();
  // context methods
  const { darkMode, sidenavColor } = controller;
  const {
    listCarts,
    tableSelected,
    clientSelected,
    paymentMethods,
    transactionType,
    printPrinter,
  } = controllerBar;
  const { isLoading } = controllerSelector;
  const handleDeleteItemToCart = (itemId) => deleteToCart(dispatchBar, itemId);
  const active = true;
  const { height } = useWindowDimensions();

  const [listItemCart, setListItemCart] = useState([]);
  const [totalTransaction, setTotalTransaction] = useState([]);
  const [responseTransaction, setResponseTransaction] = useState([]);
  const [dataItemSetting, setDataItemSetting] = useState([]);
  const [isOpenModalItemCart, setIsOpenModalItemCart] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [totalPaymentsMethod, setTotalPaymentsMethod] = useState(0);
  const [disableSendButton, setDisableSendButton] = useState(false);

  useEffect(() => {
    setListItemCart(listCarts);
    setTotalTransaction(calculateTotal(listCarts));
  }, [listCarts]);

  useEffect(() => {
    if (paymentMethods) {
      let subTotal = 0;
      paymentMethods.forEach((payment) => {
        subTotal += parseFloat(payment.value);
      });
      setTotalPaymentsMethod(subTotal);
      if (totalTransaction.length > 0 && totalTransaction.total - subTotal >= 0) {
        setDisableSendButton(true);
      }
    }
  }, [paymentMethods]);

  const handleSentTransaction = () => {
    setIsLoading(dispatchSelector, true);
    generateTransaction({
      listCarts,
      tableSelected,
      clientSelected,
      paymentMethods,
      transactionType,
    }).then((dataTransaction) => {
      if (!dataTransaction[0]) {
        toast.error(dataTransaction[1]);
        setIsLoading(dispatchSelector, false);
      } else {
        setResponseTransaction(dataTransaction);
        toast.success("Transaccion realizada correctamente");
      }
    });
  };

  useEffect(() => {
    if (responseTransaction.length > 0) {
      setLaunchPrinter(dispatchBar, true);
      setIsLoading(dispatchSelector, false);
    }
  }, [responseTransaction]);

  useEffect(() => {
    printTransaction(
      responseTransaction[2],
      transactionType,
      printPrinter,
      clientSelected,
      paymentMethods
    );
    clean(dispatchBar, true);
  }, [printPrinter]);

  const handleOnForceCloseItemCart = () => setIsOpenModalItemCart(false);
  const handleSettingItemToCart = (idItem) => {
    const dataItem = listCarts.find((item) => item.id === idItem);
    setIsOpenModalItemCart(true);
    setDataItemSetting(dataItem);
  };
  const handleSaveSetting = (data) => {
    updateItemCart(dispatchBar, data);
    setIsOpenModalItemCart(false);
  };

  return (
    <MDBox
      mb={1.5}
      sx={(theme) =>
        ItemCartBarStyle(theme, {
          darkMode,
          sidenavColor,
          active,
          height,
        })
      }
    >
      <RenderIdTable tableSelected={tableSelected} />
      <SwipeableList style={{ height: "90%" }}>
        {listItemCart.map((item) => (
          <ItemCartCard
            data={item}
            deleteItemCart={handleDeleteItemToCart}
            settingItemCart={handleSettingItemToCart}
          />
        ))}
      </SwipeableList>
      <PaymentButton
        value={totalTransaction ? totalTransaction.total : 0}
        onclickTransaction={handleSentTransaction}
        isLoading={isLoading}
        disabled={disableSendButton}
      />
      {/** Modals */}
      <ModalItemSetting
        isOpen={isOpenModalItemCart}
        handleOnForceClose={handleOnForceCloseItemCart}
        dataItemSetting={dataItemSetting}
        handleSaveSetting={handleSaveSetting}
      />
    </MDBox>
  );
}

RenderIdTable.propTypes = {
  tableSelected: PropTypes.instanceOf(Array).isRequired,
};
