import { useState, useEffect } from "react";
import { BANK_ICONS } from "config/contants";
import { useMaterialUIController } from "context";
import {
  useBarCartController,
  addPaymentMethod,
  removePaymentMethod,
} from "context/barCartContext";
import MainModal from "components/MDModales";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import NumPad from "react-numpad";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import CircleButton from "components/MDCircleButton";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { currencyFormatter } from "functions/numberFormat";
import calculateTotal from "functions/calculateTotal";
import { ModalPaymentMethodsStyle, clearButtonIconStyle } from "../../style";

export default function ModalPaymentMethods({ isOpen, handleOnForceClose, data }) {
  const [controller] = useMaterialUIController();
  const [controllerBar, dispatchBar] = useBarCartController();
  const [listMethods, setListMethods] = useState([]);
  const [valueMethod, setValueMethod] = useState([]);
  const [totalPaymentsMethod, setTotalPaymentsMethod] = useState(0);
  // context methods
  const { darkMode, sidenavColor } = controller;
  const { listCarts, paymentMethods } = controllerBar;
  const active = true;

  useEffect(() => {
    const dataPaymentMethod = data;
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
    const currentTotal = calculateTotal(listCarts);
    if (value > 0 && currentTotal.total > 0) {
      let currentListValue = valueMethod;
      currentListValue = valueMethod.map((item) =>
        item.id === payment.id && value > 0 ? { ...item, value } : item
      );
      setValueMethod(currentListValue);
      addPaymentMethod(dispatchBar, { ...payment, value });
    }
  };

  const handleRemovePaymentMethod = (payment) => {
    if (payment) {
      removePaymentMethod(dispatchBar, payment);
    }
  };

  useEffect(() => {
    if (paymentMethods) {
      let subTotal = 0;
      paymentMethods.forEach((payment) => {
        subTotal += parseFloat(payment.value);
      });
      setTotalPaymentsMethod(subTotal);
    }
  }, [paymentMethods]);

  function RenderPaymentMethods() {
    const render = [];
    listMethods?.map((payment) => {
      const currentValues = valueMethod.find((pm) => pm.id === payment.id);
      const [currentValueMethod, setCurrentValueMethod] = useState(currentValues.value);
      // eslint-disable-next-line no-unused-expressions
      payment.var_pago_mixto &&
        render.push(
          <Grid item xs={6} md={6} lg={4}>
            <NumPad.Number
              key={payment.id}
              onChange={(value) => {
                setCurrentValueMethod(value);
                addValuePaymentMethod(payment, value);
              }}
              decimal={2}
              value={currentValueMethod}
            >
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 100, margin: 0, width: "100%", backgroundSize: "contain" }}
                  image={`${process.env.PUBLIC_URL + BANK_ICONS}/icons/payments/${
                    payment.var_pago_mixto
                  }.png`}
                  title={payment?.descripcion}
                />
                <CardContent style={{ padding: "0" }}>
                  <Typography gutterBottom variant="p" component="div" style={{ fontSize: 12 }}>
                    {payment?.descripcion}
                  </Typography>
                </CardContent>
              </Card>
            </NumPad.Number>
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
      <Grid container spacing={1} style={{ overflowY: "scroll", height: "100%", padding: "9px" }}>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          style={{
            overflowY: "scroll",
            height: "100%",
            padding: "9px",
            borderRight: "0.5px #e9e9e9 solid",
          }}
        >
          <Grid container spacing={2}>
            <RenderPaymentMethods />
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          style={{
            overflowY: "scroll",
            height: "100%",
            padding: "9px",
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ width: "100%" }} size="small" aria-label="a dense table">
              <TableBody>
                <TableRow key="title" sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    Metodo pago
                  </TableCell>
                  <TableCell align="right">Valor</TableCell>
                  <TableCell align="right">Accion</TableCell>
                </TableRow>
                {paymentMethods.map(
                  (row) =>
                    row.id > 0 && (
                      <TableRow
                        key={row.name}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row.descripcion}
                        </TableCell>
                        <TableCell align="right">
                          {currencyFormatter({ currency: "COP", value: row.value })}
                        </TableCell>
                        <TableCell align="right">
                          <CircleButton
                            rol="button"
                            iconPath={`${BANK_ICONS}/interface/delete.png`}
                            sx={{ width: "45px", height: "45px" }}
                            sxIcon={clearButtonIconStyle}
                            onClick={() => handleRemovePaymentMethod(row)}
                            badgeAlert={false}
                          />
                        </TableCell>
                      </TableRow>
                    )
                )}
                <TableRow key="title" sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    Total
                  </TableCell>
                  <TableCell align="right">
                    {currencyFormatter({ currency: "COP", value: totalPaymentsMethod })}
                  </TableCell>
                  <TableCell align="right">{}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </MainModal>
  );
}

ModalPaymentMethods.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  data: PropTypes.instanceOf(Array).isRequired,
  handleOnForceClose: PropTypes.func.isRequired,
};
