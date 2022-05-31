import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
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
import ItemCartCard from "./components/ItemCartCard";
import PaymentButton from "./components/PaymentButton";
import ModalItemSetting from "./components/Modals/ModalItemSetting";
import { ItemCartBarStyle } from "./style";

function RenderIdTable({ tableSelected }) {
  return (
    <Box>
      <Typography id="modal-modal-title" variant="h6" component="h2" style={{ color: "white" }}>
        {tableSelected ? `Pedido Mesa #${tableSelected}` : ""}
      </Typography>
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

  useEffect(() => {
    setListItemCart(listCarts);
    setTotalTransaction(calculateTotal(listCarts));
  }, [listCarts]);

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
    console.log(dataItem);
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
