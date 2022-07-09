import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { BANK_ICONS, SILPOS_LOCAL, SILPOS_WEB, server } from "config/contants";
import PropTypes from "prop-types";
import { cardImageStyle } from "./style";
import "./styles.css";

export default function ItemsCard({ data, onclickItem, categoryName }) {
  // const background = "https://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG96777.png";
  let background = "";
  // eslint-disable-next-line camelcase
  const { id, articulo, venta_uno, url_foto } = data;

  // eslint-disable-next-line camelcase
  if (url_foto !== null) {
    // eslint-disable-next-line camelcase
    background = `${server === "online" ? SILPOS_WEB : SILPOS_LOCAL}/img/productos/${url_foto}`;
    if (true) {
      // eslint-disable-next-line camelcase
      background = `${server === "online" ? SILPOS_WEB : SILPOS_LOCAL}/img/productos/${url_foto}`;
    }
  } else {
    const imageName = categoryName.toLowerCase();
    background = `${BANK_ICONS}/categories/${imageName.replace(" ", "-")}.png`;
  }

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
        <p style={{ fontSize: "11px" }}>
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
  categoryName: PropTypes.string.isRequired,
};
