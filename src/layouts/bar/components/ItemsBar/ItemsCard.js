import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import { cardImageStyle } from "./style";
import "./styles.css";

export default function ItemsCard({ itemId, itemTitle, shadow, onClickItem }) {
  const background = "https://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG96777.png";
  return (
    <Grid
      role="button"
      item
      xs={4}
      md={3}
      lg={2}
      key={itemId}
      style={{ padding: "2px" }}
      onClick={() => onClickItem(itemId)}
    >
      <div className="cardContainerStyle">
        <Card sx={cardImageStyle({ background, shadow })} />
        <p style={{ fontSize: "12px" }}>{itemTitle}</p>
      </div>
    </Grid>
  );
}

ItemsCard.defaultProps = {
  shadow: true,
};

ItemsCard.propTypes = {
  itemId: PropTypes.number.isRequired,
  itemTitle: PropTypes.string.isRequired,
  shadow: PropTypes.bool,
  onClickItem: PropTypes.func.isRequired,
};
