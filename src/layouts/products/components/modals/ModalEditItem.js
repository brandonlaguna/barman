import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { useMaterialUIController } from "context";
import MainModal from "components/MDModales";
import ModalItems from "./style";

export default function ModalItem({ isOpen, handleOnForceClose, data }) {
  const [change, setChange] = useState([]);

  const [controller] = useMaterialUIController();
  // context methods
  const { darkMode, sidenavColor } = controller;
  const active = true;

  useEffect(() => {
    setChange(data);
  }, [data]);

  return (
    <MainModal
      key={2}
      isOpen={isOpen}
      onForceClose={handleOnForceClose}
      modalStyle={(theme) =>
        ModalItems(theme, {
          darkMode,
          sidenavColor,
          active,
          scrollY: "scroll",
        })
      }
    >
      <Grid
        container
        spacing={1}
        style={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          padding: 6,
          marginLeft: -2,
          overflowX: "scroll",
        }}
      >
        <p style={{ color: "red" }}>{JSON.stringify(change)}</p>
      </Grid>
    </MainModal>
  );
}

ModalItem.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  data: PropTypes.number.isRequired,
  handleOnForceClose: PropTypes.func.isRequired,
};
