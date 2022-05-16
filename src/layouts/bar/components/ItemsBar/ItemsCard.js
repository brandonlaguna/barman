import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import { cardImageStyle } from "./style";
import "./styles.css";

export default function ItemsCard({ data, onclickItem }) {
  const background = "https://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG96777.png";
  // eslint-disable-next-line camelcase
  const { id, articulo, venta_uno } = data;
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
      <br />
      <div className="cardContainerStyle">
        <div className="content-img-card">
          <Card sx={cardImageStyle({ background })} key={`childItem${id}`} />
        </div>
        <p style={{ fontSize: "12px" }}>
          {articulo}
          <br />
          <small style={{ fontSize: "10px" }}>
            ${Intl.NumberFormat("en-US").format(Number.parseInt(venta_uno, 10))}
          </small>
        </p>
      </div>
    </Grid>
  );
}

ItemsCard.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  onclickItem: PropTypes.func.isRequired,
};
