import { useMaterialUIController } from "context";
import MainModal from "components/MDModales";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import TablesCard from "../TablesCard";
import { ModalStyle } from "../../style";

export default function ModalTables({
  isOpen,
  handleOnForceClose,
  data,
  handleSelectTable,
  busyTables,
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
        {data.map((table) => (
          <TablesCard data={table} onClickTable={handleSelectTable} busyTables={busyTables} />
        ))}
      </Grid>
    </MainModal>
  );
}

ModalTables.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  data: PropTypes.instanceOf(Array).isRequired,
  handleSelectTable: PropTypes.func.isRequired,
  handleOnForceClose: PropTypes.func.isRequired,
  busyTables: PropTypes.instanceOf(Array).isRequired,
};
