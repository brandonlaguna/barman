import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { toast } from "react-toastify";
// import calculateTotal from "functions/calculateTotal";
import colors from "assets/theme/base/colors";
import { BANK_ICONS } from "config/contants";

function RenderTotal({ total }) {
  const calcTotal = Number.parseInt(total, 10).toFixed(0);
  return <Typography variant="h6" style={{ color: "white" }}>{`$${calcTotal}`}</Typography>;
}

export default function TablesCard({ data, onClickTable, busyTables, isChangeTable }) {
  const { id } = data;
  const { disponible, ocupado } = colors;
  const tableData = [];
  function validateState(puesto) {
    let state = false;
    busyTables.forEach((items) => {
      if (Number.parseInt(items.puesto, 10) === Number.parseInt(puesto, 10)) {
        state = true;
        tableData.push(items);
      }
    });
    return state;
  }
  const statusMesa = validateState(id);
  const colorStatus = statusMesa === false ? disponible : ocupado;
  let disableMesa = false;
  if (statusMesa && isChangeTable) {
    disableMesa = true;
  }
  // eslint-disable-next-line no-unused-vars
  const imgStatus =
    statusMesa === false
      ? `${BANK_ICONS}/icons/tables/round-table.png`
      : `${BANK_ICONS}/icons/tables/round-table.png`;
  // eslint-disable-next-line no-unused-vars
  const altStatus = statusMesa === false ? "Mesa Disponible" : "Mesa Ocupada";

  return (
    <Grid
      role="button"
      item
      xs={3}
      md={2}
      lg={2}
      key={id}
      onClick={() => (disableMesa ? toast.warn("Mesa ocupada") : onClickTable(id, tableData))}
    >
      <Card style={colorStatus}>
        <Grid container>
          <Grid item xs={12}>
            <Typography style={{ color: "#ffffff", fontSize: 12 }} component="div" variant="p">
              {`Mesa #${id}`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <img src={process.env.PUBLIC_URL + imgStatus} width="50%" alt="as" />
          </Grid>
        </Grid>
        <RenderTotal total={tableData.length > 0 ? tableData[0].total_factura : 0} />
      </Card>
    </Grid>
  );
}

TablesCard.defaultProps = {
  isChangeTable: false,
};

TablesCard.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  busyTables: PropTypes.instanceOf(Array).isRequired,
  onClickTable: PropTypes.func.isRequired,
  isChangeTable: PropTypes.bool,
};

RenderTotal.defaultProps = {
  total: "0",
};

RenderTotal.propTypes = {
  total: PropTypes.string,
};
