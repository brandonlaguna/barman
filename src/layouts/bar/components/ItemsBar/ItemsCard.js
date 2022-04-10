import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import { cardImageStyle } from "./style";
import "./styles.css";

export default function ItemsCard({ data, onclickItem }) {
  const background = "https://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG96777.png";
  const { id, articulo } = data;
  return (
    <Grid
      role="button"
      item
      xs={4}
      md={2}
      lg={2}
      key={id}
      style={{ marginTop: "1rem", padding: 0 }}
      onClick={() => onclickItem(data)}
    >
      <div className="cardContainerStyle">
        <div className="content-img-card">
          <Card sx={cardImageStyle({ background })} />
        </div>
        <p style={{ fontSize: "12px" }}>{articulo}</p>
      </div>
    </Grid>
  );
}

ItemsCard.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  onclickItem: PropTypes.func.isRequired,
};
