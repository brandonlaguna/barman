import { Card } from "react-swipe-card";
import PropTypes from "prop-types";

export default function ItemCartCard({ data, deleteItemCart }) {
  const { id, articulo } = data;
  const moreAction = (idItem) => console.log(`mas acciones ${idItem}`);
  return (
    <Card key={id} onSwipeLeft={() => deleteItemCart(id)} onSwipeRight={() => moreAction(id)}>
      <h2>{articulo}</h2>
    </Card>
  );
}

ItemCartCard.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  deleteItemCart: PropTypes.func.isRequired,
};
