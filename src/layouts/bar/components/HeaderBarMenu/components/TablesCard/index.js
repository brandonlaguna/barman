import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import colors from "assets/theme/base/colors";

export default function TablesCard({ data, onClickTable, busyTables }) {
  const { id } = data;
  const { disponible, ocupado } = colors;
  function validateState(puesto) {
    let state = false;
    busyTables.forEach((items) => {
      if (Number.parseInt(items.puesto, 10) === Number.parseInt(puesto, 10)) {
        state = true;
      }
    });
    return state;
  }
  const statusMesa = validateState(id);
  const colorStatus = statusMesa === false ? disponible : ocupado;
  const imgStatus =
    statusMesa === false
      ? "assets/Bankicon/icons/tables/mesa_libre.png"
      : "assets/Bankicon/icons/tables/mesa_ocupada.png";
  const altStatus = statusMesa === false ? "Mesa Disponible" : "Mesa Ocupada";

  return (
    <Grid role="button" item xs={4} md={3} lg={2} key={id} onClick={() => onClickTable(id)}>
      <Card style={colorStatus}>
        <Box>
          <CardContent style={{ paddingBottom: "0px" }}>
            <Typography style={{ color: "#ffffff" }} component="div" variant="h5">
              {`Mesa #${id}`}
            </Typography>
          </CardContent>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 60 }}
          image={process.env.PUBLIC_URL + imgStatus}
          alt={altStatus}
        />
      </Card>
    </Grid>
  );
}

TablesCard.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  busyTables: PropTypes.instanceOf(Array).isRequired,
  onClickTable: PropTypes.func.isRequired,
};
