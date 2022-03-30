import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import { cardImageStyle } from "./style";
import "./styles.css";

export default function ItemsCard({ data, shadow, onclickItem }) {
  const background = "https://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG96777.png";
  const { id, articulo } = data;
  return (
    <Grid
      role="button"
      item
      xs={4}
      md={3}
      lg={2}
      key={id}
      style={{ padding: "2px" }}
      onClick={() => onclickItem(data)}
    >
      <div className="cardContainerStyle">
        <Card sx={cardImageStyle({ background, shadow })} />
        <p style={{ fontSize: "12px" }}>{articulo}</p>
      </div>
    </Grid>
  );
}

ItemsCard.defaultProps = {
  shadow: true,
};

ItemsCard.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  shadow: PropTypes.bool,
  onclickItem: PropTypes.func.isRequired,
};
