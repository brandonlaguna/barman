import { useEffect, useState } from "react";
import { useBarCartController, addItemToCart } from "context/barCartContext";
import MDBox from "components/MDBox";
import CartContainerStyle from "assets/theme/carBarStyle";
import { useMaterialUIController } from "context";
import { getItems, groupItems } from "model/ItemsModel";
import useWindowDimensions from "functions/windowDimension";
import ScrollMenuItem from "./HorizontalScrollContainer";

export default function ItemsBar() {
  const [controller] = useMaterialUIController();
  const [controllerBar, dispatchBar] = useBarCartController();

  const { listCarts } = controllerBar;
  const { darkMode, sidenavColor } = controller;
  const [listItems, setListItem] = useState([]);
  const active = true;

  const { height } = useWindowDimensions();

  useEffect(() => {
    getItems().then((resItem) => setListItem(groupItems(resItem)));
    console.log(listCarts);
  }, [getItems]);

  const handleAddItemToCart = (itemId) => addItemToCart(dispatchBar, itemId);

  return (
    <MDBox
      sx={(theme) =>
        CartContainerStyle(theme, {
          darkMode,
          sidenavColor,
          active,
          height,
        })
      }
    >
      <ScrollMenuItem listItems={listItems} onClickItem={handleAddItemToCart} />
    </MDBox>
  );
}
