import { useState, useEffect } from "react";
import { BANK_ICONS } from "config/contants";
import { useMaterialUIController } from "context";
import { useBarCartController, addPaymentMethod } from "context/barCartContext";
import calculateTotal from "functions/calculateTotal";
import getConfiguracion from "model/configuracionModel";
import MainModal from "components/MDModales";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import NumPad from "react-numpad";
import CircleButton from "components/MDCircleButton";
import { ModalPaymentMethodsStyle, buttonIconStyle } from "../../style";

export default function ModalPaymentMethods({ isOpen, handleOnForceClose, data }) {
  const [controller] = useMaterialUIController();
  const [controllerBar, dispatchBar] = useBarCartController();
  const [listMethods, setListMethods] = useState([]);
  const [valueMethod, setValueMethod] = useState([]);
  const [comisionPercent, setComisionPercent] = useState(null);
  // context methods
  const { darkMode, sidenavColor } = controller;
  const { listCarts } = controllerBar;
  const active = true;

  useEffect(() => {
    getConfiguracion().then((conf) => {
      const { comision } = conf[0];
      setComisionPercent(comision);
    });
  }, []);

  useEffect(() => {
    const dataPaymentMethod = [
      {
        id: 0,
        descripcion: "PROPINA",
        var_pago_mixto: "propina",
      },
      ...data,
    ];

    setListMethods(dataPaymentMethod);
  }, [data]);

  useEffect(() => {
    const currentListValue = [];
    listMethods.forEach((payment) => {
      currentListValue.push({ ...payment, value: 0 });
    });
    setValueMethod(currentListValue);
    // addPaymentMethod(dispatchBar, currentListValue);
  }, [listMethods]);

  const addValuePaymentMethod = (payment, value) => {
    let currentListValue = valueMethod;
    currentListValue = valueMethod.map((item) =>
      item.id === payment.id && value > 0 ? { ...item, value } : item
    );
    setValueMethod(currentListValue);
    addPaymentMethod(dispatchBar, { ...payment, value });
  };

  useEffect(() => {
    if (comisionPercent !== null) {
      const percent = comisionPercent / 100;
      const { total } = calculateTotal(listCarts);
      addValuePaymentMethod({ id: 0 }, total * percent);
    }
  }, [listCarts]);

  function RenderPaymentMethods() {
    const render = [];
    listMethods?.map((payment) => {
      const currentValues = valueMethod.find((pm) => pm.id === payment.id);
      const [currentValueMethod, setCurrentValueMethod] = useState(currentValues.value);
      render.push(
        <Grid container spacing={3} style={{ marginTop: "0px" }}>
          <Grid item xs={10} md={10} lg={10}>
            <NumPad.Number
              key={payment.id}
              onChange={(value) => {
                setCurrentValueMethod(value);
                addValuePaymentMethod(payment, value);
              }}
              decimal={2}
              value={currentValueMethod}
            >
              <TextField
                key={`paymentChild${payment.id}`}
                id="outlined-number"
                label={payment.descripcion}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ width: "100%" }}
                value={currentValueMethod}
              />
            </NumPad.Number>
          </Grid>
          <Grid item xs={2} md={2} lg={2}>
            <Grid container spacing={1}>
              <Grid item xs={6} md={6} lg={6}>
                <CircleButton
                  iconPath={`${BANK_ICONS}/interface/broom.svg`}
                  sx={{ width: "45px", height: "45px" }}
                  sxIcon={buttonIconStyle}
                  onClick={() => null}
                />
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <CircleButton
                  iconPath={`${BANK_ICONS}/interface/keyboard.svg`}
                  sx={{ width: "45px", height: "45px" }}
                  sxIcon={buttonIconStyle}
                  onClick={() => null}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );
      return null;
    });
    return render;
  }

  return (
    <MainModal
      key={1}
      isOpen={isOpen}
      onForceClose={handleOnForceClose}
      modalStyle={(theme) =>
        ModalPaymentMethodsStyle(theme, {
          darkMode,
          sidenavColor,
          active,
          scrollY: "scroll",
        })
      }
    >
      <div style={{ overflowY: "scroll", height: "100%" }}>
        <RenderPaymentMethods />
      </div>
    </MainModal>
  );
}

ModalPaymentMethods.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  data: PropTypes.instanceOf(Array).isRequired,
  handleOnForceClose: PropTypes.func.isRequired,
};
