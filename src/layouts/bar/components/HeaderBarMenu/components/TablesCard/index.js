import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default function TablesCard({ data, onClickTable }) {
  const { id } = data;
  return (
    <Grid role="button" item xs={4} md={3} lg={2} key={id} onClick={() => onClickTable(id)}>
      <Card>
        <Box>
          <CardContent>
            <Typography component="div" variant="h5">
              {`Mesa #${id}`}
            </Typography>
          </CardContent>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 40 }}
          image="https://cdn-icons-png.flaticon.com/512/1209/1209474.png"
          alt="Live from space album cover"
        />
      </Card>
    </Grid>
  );
}

TablesCard.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  onClickTable: PropTypes.func.isRequired,
};
