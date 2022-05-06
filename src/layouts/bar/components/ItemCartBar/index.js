import { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import { useMaterialUIController } from "context";
import { useBarCartController, deleteToCart } from "context/barCartContext";
import { useSelectorController, setIsLoading } from "context/selectorContext";
import useWindowDimensions from "functions/windowDimension";
import { SwipeableList } from "@sandstreamdev/react-swipeable-list";
import generateTransaction from "transactions/generateTransaction";
import "@sandstreamdev/react-swipeable-list/dist/styles.css";
import calculateTotal from "functions/calculateTotal";
import ItemCartCard from "./components/ItemCartCard";
import PaymentButton from "./components/PaymentButton";
import ItemCartBarStyle from "./style";

export default function ItemCartBar() {
  // context controllers
  const [controller] = useMaterialUIController();
  const [controllerBar, dispatchBar] = useBarCartController();
  const [controllerSelector, dispatchSelector] = useSelectorController();
  // context methods
  const { darkMode, sidenavColor } = controller;
  const { listCarts, tableSelected, clientSelected, paymentMethods, transactionType } =
    controllerBar;
  const { isLoading } = controllerSelector;
  const handleDeleteItemToCart = (itemId) => deleteToCart(dispatchBar, itemId);
  const active = true;
  const { height } = useWindowDimensions();

  const [listItemCart, setListItemCart] = useState([]);
  const [totalTransaction, setTotalTransaction] = useState([]);

  useEffect(() => {
    setListItemCart(listCarts);
    setTotalTransaction(calculateTotal(listCarts));
  }, [listCarts]);

  const handleSentTransaction = () => {
    setIsLoading(dispatchSelector, true);
    console.log(isLoading);
    generateTransaction({
      listCarts,
      tableSelected,
      clientSelected,
      paymentMethods,
      transactionType,
    }).then(() => setIsLoading(dispatchSelector, false));
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
      <SwipeableList style={{ height: "90%" }}>
        {listItemCart.map((item) => (
          <ItemCartCard data={item} deleteItemCart={handleDeleteItemToCart} />
        ))}
      </SwipeableList>
      <PaymentButton
        value={totalTransaction ? totalTransaction.total : 0}
        onclickTransaction={handleSentTransaction}
        isLoading={isLoading}
      />
    </MDBox>
  );
}
