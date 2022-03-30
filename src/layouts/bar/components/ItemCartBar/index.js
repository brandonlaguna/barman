import { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import PropTypes from "prop-types";
import { useMaterialUIController } from "context";
import { useBarCartController, deleteToCart } from "context/barCartContext";
import Cards, { Card } from "react-swipe-card";
// import ItemCartCard from "./components/ItemCartCard";
import ItemCartBarStyle from "./style";

export default function ItemCartBar({ light }) {
  // context controllers
  const [controller] = useMaterialUIController();
  const [controllerBar, dispatchBar] = useBarCartController();
  // context methods
  const { darkMode, sidenavColor } = controller;
  const { listCarts } = controllerBar;

  const [listItemCart, setListItemCart] = useState([]);

  useEffect(() => {
    setListItemCart(listCarts);
  }, [listCarts]);
  const handledeleteItemToCart = (itemId) => deleteToCart(dispatchBar, itemId);
  const moreAction = (idItem) => console.log(`mas acciones ${idItem}`);

  const active = true;
  // const action = (data) => console.log(data);

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
      <Cards className="master-root" offsetWidth={5}>
        {listItemCart.map((item) => (
          // <ItemCartCard data={item} deleteItemCart={() => handledeleteItemToCart} />
          <Card
            key={item.id}
            onSwipeLeft={() => handledeleteItemToCart(item.id)}
            onSwipeRight={() => moreAction(item.id)}
          >
            <h2>{item.articulo}</h2>
          </Card>
        ))}
      </Cards>
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
