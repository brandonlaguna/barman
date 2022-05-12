import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import colors from "assets/theme/base/colors";

export default function TablesCard({ data, onClickTable }) {
  const { id, status } = data;
  const { disponible, ocupado } = colors;
  const colorStatus = status === true ? disponible : ocupado;
  const imgStatus =
    status === true
      ? "assets/Bankicon/icons/tables/mesa_libre.png"
      : "assets/Bankicon/icons/tables/mesa_ocupada.png";
  const altStatus = status === true ? "Mesa Disponible" : "Mesa Ocupada";
  return (
    <Grid role="button" item xs={4} md={3} lg={2} key={id} onClick={() => onClickTable(id)}>
      <Card style={colorStatus}>
        <Box>
          <CardContent>
            <Typography component="div" variant="h5">
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
  onClickTable: PropTypes.func.isRequired,
};
