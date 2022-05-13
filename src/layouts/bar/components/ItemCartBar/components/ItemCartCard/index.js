import { SwipeableListItem } from "@sandstreamdev/react-swipeable-list";
import { Typography, Grid, Box } from "@mui/material";
import PropTypes from "prop-types";
import { APP_COLORS } from "config/contants";
import { useMaterialUIController } from "context";
import MDBox from "components/MDBox";
import { ItemCartCardStyle } from "../../style";
import "./style.css";

export default function ItemCartCard({ data, deleteItemCart }) {
  // eslint-disable-next-line camelcase
  const { id, articulo, cantidad, venta_uno } = data;
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
    action: () => console.info("swipe action triggered"),
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
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
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
};
