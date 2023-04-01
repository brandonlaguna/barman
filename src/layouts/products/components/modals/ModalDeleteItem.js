import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { useMaterialUIController } from "context";
import MainModal from "components/MDModales";
import { Typography, Box } from "@mui/material";
import Button from "@mui/material/Button";
import { APP_COLORS } from "config/contants";
import { ModalDeleteItems } from "./style";

export default function ModalDeleteItem({ isOpen, handleOnForceClose, data, onSuccess, onCancel }) {
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
        ModalDeleteItems(theme, {
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
        <Grid item xs={12}>
          <Box style={{ color: "gray", textAlign: "center" }}>
            <Typography>¿Deseas eliminar este articulo?</Typography>
            <Typography>{change?.articulo}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Button
            variant="outlined"
            fullWidth
            color="success"
            style={{
              color: APP_COLORS.success,
            }}
            onClick={onSuccess}
          >
            Si Eliminar
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Button
            variant="outlined"
            fullWidth
            color="error"
            style={{
              color: APP_COLORS.danger,
            }}
            onClick={onCancel}
          >
            Cancelar
          </Button>
        </Grid>
      </Grid>
    </MainModal>
  );
}

ModalDeleteItem.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  data: PropTypes.number.isRequired,
  handleOnForceClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
