import { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import PropTypes from "prop-types";
import { useMaterialUIController } from "context";
import { useBarCartController, deleteToCart } from "context/barCartContext";
import { SwipeableList } from "@sandstreamdev/react-swipeable-list";
import "@sandstreamdev/react-swipeable-list/dist/styles.css";
import ItemCartCard from "./components/ItemCartCard";
import ItemCartBarStyle from "./style";

export default function ItemCartBar({ light }) {
  // context controllers
  const [controller] = useMaterialUIController();
  const [controllerBar, dispatchBar] = useBarCartController();
  // context methods
  const { darkMode, sidenavColor } = controller;
  const { listCarts } = controllerBar;
  const handledeleteItemToCart = (itemId) => deleteToCart(dispatchBar, itemId);
  const active = true;

  const [listItemCart, setListItemCart] = useState([]);
  useEffect(() => {
    setListItemCart(listCarts);
  }, [listCarts]);

  return (
    <MDBox
      mb={1.5}
      sx={(theme) =>
        ItemCartBarStyle(theme, {
          darkMode,
          sidenavColor,
          active,
        })
      }
    >
      <SwipeableList>
        {listItemCart.map((item) => (
          <ItemCartCard data={item} deleteItemCart={handledeleteItemToCart} />
        ))}
      </SwipeableList>
      <p>{light}</p>
    </MDBox>
  );
}

ItemCartBar.defaultProps = {
  light: false,
};

ItemCartBar.propTypes = {
  light: PropTypes.bool,
};
