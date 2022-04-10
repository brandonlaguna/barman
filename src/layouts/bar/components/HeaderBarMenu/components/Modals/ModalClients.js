import { useMaterialUIController } from "context";
import SearchBar from "components/MDSearchBar";
import MainModal from "components/MDModales";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import CardClient from "../CardClient";
import { ModalClientStyle } from "../../style";

export default function ModalClient({ isOpen, handleOnForceClose, data, handleSelectClient }) {
  const [controller] = useMaterialUIController();
  // context methods
  const { darkMode, sidenavColor } = controller;
  const active = true;

  const onClickClient = (client) => handleSelectClient(client);

  return (
    <MainModal
      key={2}
      isOpen={isOpen}
      onForceClose={handleOnForceClose}
      modalStyle={(theme) =>
        ModalClientStyle(theme, {
          darkMode,
          sidenavColor,
          active,
          scrollY: "scroll",
        })
      }
    >
      <Grid container spacing={1} style={{ overflowY: "scroll", height: "100%" }}>
        <div style={{ width: "100%" }}>
          <SearchBar />
          <CardClient data={data} onClickClient={onClickClient} />
        </div>
      </Grid>
    </MainModal>
  );
}

ModalClient.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleOnForceClose: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(Array).isRequired,
  handleSelectClient: PropTypes.func.isRequired,
};
