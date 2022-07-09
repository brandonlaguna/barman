import { useMaterialUIController } from "context";
import MainModal from "components/MDModales";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import MDTypography from "components/MDTypography";
import TablesCard from "../TablesCard";
import { ModalStyle } from "../../style";

export default function ModalTables({
  isOpen,
  handleOnForceClose,
  data,
  handleSelectTable,
  busyTables,
  isChangeTable,
}) {
  const [controller] = useMaterialUIController();
  // context methods
  const { darkMode, sidenavColor } = controller;
  const active = true;

  return (
    <MainModal
      key={1}
      isOpen={isOpen}
      onForceClose={handleOnForceClose}
      modalStyle={(theme) =>
        ModalStyle(theme, {
          darkMode,
          sidenavColor,
          active,
          scrollY: "scroll",
        })
      }
    >
      <Grid container spacing={1} style={{ overflowY: "scroll", height: "100%" }}>
        <Grid item xs={12} sm={12} md={12}>
          {isChangeTable === true && (
            <div style={{ width: "100%", textAlign: "center" }}>
              <MDTypography
                fontWeight="bold"
                textTransform="capitalize"
                variant="h6"
                color="dark"
                noWrap
              >
                Cambio de mesa
              </MDTypography>
            </div>
          )}
        </Grid>
        {data.map((table) => (
          <TablesCard
            data={table}
            onClickTable={handleSelectTable}
            busyTables={busyTables}
            isChangeTable={isChangeTable}
          />
        ))}
      </Grid>
    </MainModal>
  );
}

ModalTables.defaultProps = {
  isChangeTable: false,
};

ModalTables.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  data: PropTypes.instanceOf(Array).isRequired,
  handleSelectTable: PropTypes.func.isRequired,
  handleOnForceClose: PropTypes.func.isRequired,
  busyTables: PropTypes.instanceOf(Array).isRequired,
  isChangeTable: PropTypes.bool,
};
