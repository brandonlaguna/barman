import { useState, useEffect } from "react";
import MainModal from "components/MDModales";
import { InputLabel, Input, FormControl, TextareaAutosize, Grid, Button } from "@mui/material";
import { useMaterialUIController } from "context";
import SendIcon from "@mui/icons-material/Send";
import NumPad from "react-numpad";
import PropTypes from "prop-types";
import { ModalItemSettingStyle } from "../../style";

export default function ModalItemSetting({
  isOpen,
  handleOnForceClose,
  dataItemSetting,
  handleSaveSetting,
}) {
  const [controller] = useMaterialUIController();
  const [itemName, setItemName] = useState("Loading...");
  const [itemPrice, setItemPrice] = useState("0");
  const [itemQuantity, setItemQuantity] = useState("0");
  const [itemDescription, setItemDescription] = useState("...");
  const [data, setData] = useState([]);
  // context methods
  const { darkMode, sidenavColor } = controller;
  const active = true;

  useEffect(() => {
    /* eslint-disable camelcase */
    const { articulo, venta_uno, cantidad, observacion } = dataItemSetting;
    setItemName(articulo);
    setItemPrice(venta_uno);
    setItemQuantity(cantidad);
    setData(dataItemSetting);
    setItemDescription(observacion);
  }, [dataItemSetting]);

  const onHandleSave = () => {
    const tempData = {
      ...data,
      venta_uno: Number.parseInt(itemPrice, 10),
      cantidad: Number.parseInt(itemQuantity, 10),
      observacion: itemDescription,
    };
    handleSaveSetting(tempData);
    setItemDescription("");
  };

  return (
    <MainModal
      key={2}
      isOpen={isOpen}
      onForceClose={handleOnForceClose}
      modalStyle={(theme) =>
        ModalItemSettingStyle(theme, {
          darkMode,
          sidenavColor,
          active,
          scrollY: "scroll",
        })
      }
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ m: 1 }} variant="standard" disabled>
            <InputLabel htmlFor="component-simple">Precio</InputLabel>
            <Input
              id="itemName"
              type="text"
              value={itemName}
              onChange={(event) => setItemName(event.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <NumPad.Number
            key="itemPriceNumPad"
            onChange={(value) => {
              setItemPrice(value);
            }}
            decimal={2}
            value={itemPrice}
          >
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="component-simple">Precio</InputLabel>
              <Input
                id="itemPrice"
                type="number"
                value={itemPrice}
                onChange={(event) => setItemPrice(event.target.value)}
              />
            </FormControl>
          </NumPad.Number>
        </Grid>
        <Grid item xs={6}>
          <NumPad.Number
            key="itemQuantityNumPad"
            onChange={(value) => {
              setItemQuantity(value);
            }}
            decimal={2}
            value={itemQuantity}
          >
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="component-simple">Cantidad</InputLabel>
              <Input
                id="itemQuantity"
                type="number"
                value={itemQuantity}
                onChange={(event) => setItemQuantity(event.target.value)}
              />
            </FormControl>
          </NumPad.Number>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <TextareaAutosize
              aria-label="minimum height"
              minRows={3}
              placeholder="Observación"
              value={itemDescription}
              style={{ width: "100%" }}
              onChange={(event) => setItemDescription(event.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <FormControl fullWidth>
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              style={{ color: "white" }}
              onClick={() => onHandleSave()}
            >
              Guardar
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    </MainModal>
  );
}

ModalItemSetting.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleOnForceClose: PropTypes.func.isRequired,
  dataItemSetting: PropTypes.instanceOf(Array).isRequired,
  handleSaveSetting: PropTypes.func.isRequired,
};
