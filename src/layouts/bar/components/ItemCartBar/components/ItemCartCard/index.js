import { SwipeableListItem } from "@sandstreamdev/react-swipeable-list";
import { Typography, Grid, Box } from "@mui/material";
import PropTypes from "prop-types";
import { APP_COLORS, SILPOS_LOCAL, SILPOS_WEB, BANK_ICONS } from "config/contants";
import { useMaterialUIController } from "context";
import MDBox from "components/MDBox";
import { ItemCartCardStyle } from "../../style";
import "./style.css";

export default function ItemCartCard({ data, deleteItemCart, settingItemCart }) {
  // eslint-disable-next-line camelcase
  const { id, articulo, cantidad, venta_uno, url_foto, categoria } = data;
  const [controller] = useMaterialUIController();
  // context methods
  const { darkMode, sidenavColor } = controller;
  const active = true;

  const handleSwipeLeft = {
    content: (
      <div
        style={{
          background: APP_COLORS.success,
          width: "100%",
          height: "100%",
          borderRadius: "8px",
        }}
      />
    ),
    action: () => settingItemCart(id),
  };
  const handleSwipeRight = {
    content: (
      <div
        style={{
          background: APP_COLORS.danger,
          width: "100%",
          height: "100%",
          borderRadius: "8px",
        }}
      />
    ),
    action: () => deleteItemCart(id),
  };

  let background = "";

  // eslint-disable-next-line camelcase
  if (url_foto !== null) {
    // eslint-disable-next-line camelcase
    background = `${SILPOS_WEB}/img/productos/${url_foto}`;
    if (true) {
      // eslint-disable-next-line camelcase
      background = `${SILPOS_LOCAL}/img/productos/${url_foto}`;
    }
  } else {
    const listCategories = localStorage.getItem("categorias");
    const categories = JSON.parse(listCategories).data;
    const categoryName = categories.filter(
      (cat) => Number.parseInt(cat.id, 10) === Number.parseInt(categoria, 10)
    )[0];
    console.log(categoryName.categoria);
    const imageName = categoryName.categoria.toLowerCase();
    background = `${BANK_ICONS}/categories/${imageName.replace(" ", "-")}.png`;
  }

  return (
    <SwipeableListItem swipeLeft={handleSwipeLeft} swipeRight={handleSwipeRight}>
      <MDBox
        mb={1.5}
        sx={(theme) =>
          ItemCartCardStyle(theme, {
            darkMode,
            sidenavColor,
            active,
          })
        }
      >
        <Grid container>
          <Grid item xs={3} md={3} lg={3} style={{ paddingTop: 4 }}>
            <Box
              component="img"
              sx={{
                height: 60,
                width: 60,
                maxHeight: { xs: 60, md: 60 },
                maxWidth: { xs: 60, md: 60 },
                borderRadius: "6px",
              }}
              alt="Image item"
              src={background}
            />
          </Grid>
          <Grid item xs={9} md={9} lg={9}>
            <Typography
              component="p"
              variant="button"
              fontWeight="bold"
              textTransform="capitalize"
              color="dark"
              opacity={0.5}
            >
              {articulo}
            </Typography>
            <Typography
              component="p"
              variant="button"
              fontWeight="300"
              textTransform="capitalize"
              color="gray"
              opacity={0.5}
            >
              x{cantidad}
              {" Precio: $"}
              {Intl.NumberFormat("en-US").format(
                (Number.parseInt(cantidad, 10) * Number.parseInt(venta_uno, 10)).toFixed(2)
              )}
            </Typography>
          </Grid>
        </Grid>
      </MDBox>
    </SwipeableListItem>
  );
}

ItemCartCard.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  deleteItemCart: PropTypes.func.isRequired,
  settingItemCart: PropTypes.func.isRequired,
};
