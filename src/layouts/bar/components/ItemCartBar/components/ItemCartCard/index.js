import { SwipeableListItem } from "@sandstreamdev/react-swipeable-list";
import PropTypes from "prop-types";
import { APP_COLORS } from "config/contants";

export default function ItemCartCard({ data, deleteItemCart }) {
  const { id, articulo, cantidad } = data;

  const handleSwipeLeft = {
    content: <div style={{ background: APP_COLORS.success, width: "100%", height: "100%" }} />,
    action: () => console.info("swipe action triggered"),
  };
  const handleSwipeRight = {
    content: <div style={{ background: APP_COLORS.danger, width: "100%", height: "100%" }} />,
    action: () => deleteItemCart(id),
  };

  return (
    <SwipeableListItem swipeLeft={handleSwipeLeft} swipeRight={handleSwipeRight}>
      <div style={{ background: "white", color: "black", width: "100%", height: "100%" }}>
        <p>
          {articulo} x {cantidad}
        </p>
      </div>
    </SwipeableListItem>
  );
}

ItemCartCard.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  deleteItemCart: PropTypes.func.isRequired,
};
