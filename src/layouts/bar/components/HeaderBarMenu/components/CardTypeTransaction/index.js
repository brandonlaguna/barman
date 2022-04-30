import PropTypes from "prop-types";
import { Grid, Box, Card } from "@mui/material";
import MDTypography from "components/MDTypography";

export default function CardTypeTransaction({ data, onClickTypeTransaction }) {
  const { id, title, detail, image } = data;
  return (
    <Grid
      role="button"
      item
      xs={12}
      md={12}
      lg={6}
      key={id}
      onClick={() => onClickTypeTransaction(id)}
      style={{ justifyContent: "center", alignItems: "center" }}
    >
      <Card sx={{ justifyContent: "center" }} key={id}>
        <Box
          component="img"
          sx={{
            height: 150,
            width: 150,
            maxHeight: { xs: 220, md: 220 },
            maxWidth: { xs: 220, md: 220 },
            alignSelf: "center",
          }}
          alt={detail}
          src={image}
        />
        <MDTypography
          fontWeight="bold"
          textTransform="capitalize"
          variant="h5"
          color="dark"
          noWrap
          alignSelf="center"
        >
          {title}
        </MDTypography>
        <MDTypography
          fontWeight="thin"
          textTransform="capitalize"
          variant="span"
          color="dark"
          noWrap
        >
          {detail}
        </MDTypography>
      </Card>
    </Grid>
  );
}

CardTypeTransaction.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  onClickTypeTransaction: PropTypes.func.isRequired,
};
