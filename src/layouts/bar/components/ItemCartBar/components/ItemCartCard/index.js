import { SwipeableListItem } from "@sandstreamdev/react-swipeable-list";
import PropTypes from "prop-types";

export default function ItemCartCard({ data, deleteItemCart }) {
  const { id, articulo, cantidad } = data;
  return (
    <SwipeableListItem
      swipeLeft={{
        content: <div style={{ background: "green", width: "100%", height: "100%" }} />,
        action: () => console.info("swipe action triggered"),
      }}
      swipeRight={{
        content: <div style={{ background: "red", width: "100%", height: "100%" }} />,
        action: () => deleteItemCart(id),
      }}
      onSwipeProgress={(progress) => console.info(`Swipe progress: ${progress}%`)}
    >
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
