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
        <SearchBar />
        <CardClient data={data} onClickClient={handleSelectClient} />
        {/* data.map((element) => (
          <button type="button" key={element.id} onClick={() => handleSelectClient(element)}>
            <p>{element.nombres}</p>
          </button>
        ))  */}
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
