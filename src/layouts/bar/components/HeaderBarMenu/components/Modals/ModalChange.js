import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
// import { useMaterialUIController } from "context";
import PropTypes from "prop-types";
import MainModal from "components/MDModales";

export default function ModalChange ({ isOpen, totalChange }) {
  const [change, setChange] = useState

  useEffect(() => {
    setChange(totalChange);
  }, []);

  return (
    <MainModal
      key={2}
      isOpen={isOpen}
      onForceClose={handleOnForceClose}
      modalStyle={(theme) =>
        ModalChangeStyle(theme, {
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
        <p>{change}</p>
      </Grid>
    </MainModal>
  );
}

ModalChange.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  totalChange: PropTypes.number.isRequired,
};