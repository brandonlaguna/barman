import { SwipeableListItem } from "@sandstreamdev/react-swipeable-list";
import { Typography, Grid, Box } from "@mui/material";
import PropTypes from "prop-types";
import { APP_COLORS, SILPOS_LOCAL, SILPOS_WEB, BANK_ICONS, server } from "config/contants";
import { useMaterialUIController } from "context";
import MDBox from "components/MDBox";
import { ItemCartCardStyle } from "../../style";
import "./style.css";

export default function ItemCartCard({ data, deleteItemCart, settingItemCart }) {
  // eslint-disable-next-line camelcase
  const { id, articulo, cantidad, venta_uno, url_foto, observacion } = data;
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
  if (url_foto) {
    // eslint-disable-next-line camelcase
    background = `${server === "online" ? SILPOS_WEB : SILPOS_LOCAL}/img/productos/${url_foto}`;
    // eslint-disable-next-line camelcase
    if (url_foto.includes("data:image/")) {
      // eslint-disable-next-line camelcase
      background = url_foto;
    }
  } else {
    background = `${BANK_ICONS}/interface/menu.png`;
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
          <Grid item xs={3} md={3} lg={3} style={{ paddingTop: 7 }}>
            <Box
              component="img"
              sx={{
                height: 50,
                width: 50,
                maxHeight: { xs: 50, md: 50 },
                maxWidth: { xs: 50, md: 50 },
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
              sx={{ fontSize: 11 }}
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
              sx={{ fontSize: 11 }}
            >
              x{cantidad}
              {" Precio: $"}
              {Intl.NumberFormat("en-US").format(
                (Number.parseInt(cantidad, 10) * Number.parseInt(venta_uno, 10)).toFixed(2)
              )}
            </Typography>
            <Typography
              component="p"
              variant="button"
              fontWeight="300"
              textTransform="capitalize"
              color="gray"
              opacity={0.5}
              sx={{ fontSize: 11, width: "100%" }}
            >
              {`${observacion ? `${observacion.slice(0, 20)}...` : ""}`}
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
