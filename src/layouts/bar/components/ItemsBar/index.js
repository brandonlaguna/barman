import { useEffect, useState } from "react";
import { useBarCartController, addItemToCart } from "context/barCartContext";
import MDBox from "components/MDBox";
import CartContainerStyle from "assets/theme/carBarStyle";
import { useMaterialUIController } from "context";
import { getItems, groupItems } from "model/ItemsModel";
import PropTypes from "prop-types";
import useWindowDimensions from "functions/windowDimension";
import { useResizeDetector } from "react-resize-detector";
import ScrollMenuItem from "./HorizontalScrollContainer";

export default function ItemsBar({ scrollToCategory }) {
  const [controller] = useMaterialUIController();
  const [controllerBar, dispatchBar] = useBarCartController();

  // eslint-disable-next-line no-unused-vars
  const { listCarts } = controllerBar;
  const { darkMode, sidenavColor } = controller;
  const [listItems, setListItem] = useState([]);
  const active = true;

  const { height } = useWindowDimensions();
  const { width, ref } = useResizeDetector();

  useEffect(() => {
    getItems().then((resItem) => setListItem(groupItems(resItem)));
  }, [getItems]);

  const handleAddItemToCart = (itemId) => addItemToCart(dispatchBar, itemId);

  return (
    <div>
      <MDBox
        sx={(theme) =>
          CartContainerStyle(theme, {
            darkMode,
            sidenavColor,
            active,
            height,
          })
        }
        ref={ref}
      >
        <ScrollMenuItem
          listItems={listItems}
          onClickItem={handleAddItemToCart}
          scrollToCategory={scrollToCategory}
          parentWidth={width}
        />
      </MDBox>
    </div>
  );
}

ItemsBar.propTypes = {
  scrollToCategory: PropTypes.number.isRequired,
};
