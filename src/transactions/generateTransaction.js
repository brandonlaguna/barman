/* eslint-disable camelcase */
import { dataTransaction, ventaTransaction } from "model/dataTransaction";
import PropTypes from "prop-types";
import { sendIndividualTransaction } from "services/transactionServices";
import md5 from "md5";
import { getDate } from "functions/getTime";
import { calculateTotal } from "functions/calculateTotal";
import { getUserData } from "model/userModel";

const idventa = Math.floor(Math.random() * 1000);

function itemsCollection(listCarts) {
  const arrayItems = [];
  listCarts.forEach((element) => {
    arrayItems.push({
      ...ventaTransaction,
      barras: "",
      bonificacion: "",
      interno: element.id,
      producto: element.articulo,
      total: element.venta_uno * element.cantidad,
      totale: element.venta_uno * element.cantidad,
      cantida: element.cantidad,
      factor_venta: element.factor_venta,
      precio_costo: element.precio_costo,
      venta_uno: element.venta_uno,
      venta_dos: element.venta_dos,
      venta_tres: element.venta_tres,
      idventa,
      valor: element.venta_uno,
      observacion: element.observacion,
    });
  });
  return arrayItems;
}

function paymentMethodsCollection(paymentMethods) {
  // eslint-disable-next-line camelcase, no-nested-ternary
  const tipo_pago = paymentMethods.length > 1 ? 5 : paymentMethods[0] ? paymentMethods[0].id : 1;
  let payments = [];
  if (paymentMethods.length > 1) {
    const medios_pago = [];
    const idmedios_pago = [];
    const observacion_medios_pago = [];
    paymentMethods.forEach((element) => {
      if (element.id > 0) {
        medios_pago.push(parseFloat(element.value));
        idmedios_pago.push(parseInt(element.id, 10));
        observacion_medios_pago.push("");
      }
    });
    payments = { tipo_pago, medios_pago, idmedios_pago, observacion_medios_pago };
  } else {
    payments = { tipo_pago };
  }
  return payments;
  // eslint-disable-next-line camelcase
}

function dataCollection(
  tableSelected,
  clientSelected,
  paymentMethods,
  listCarts,
  transactionType,
  userData
) {
  const arrayPayments = paymentMethodsCollection(paymentMethods);
  const hashToken = `${
    clientSelected?.id > 0 ? clientSelected.documento : dataTransaction.cc_cliente
  }-${getDate().toString()}`;

  const totales = calculateTotal(listCarts);
  const arrayData = {
    ...dataTransaction,
    ...totales,
    ...arrayPayments,
    cc_cliente: clientSelected?.id > 0 ? clientSelected.documento : dataTransaction.cc_cliente, // client or default
    cliente: clientSelected?.id > 0 ? clientSelected.id : dataTransaction.cliente,
    nombre:
      clientSelected?.id > 0
        ? `${clientSelected.razon_social} ${clientSelected.nombres} ${clientSelected.apellidos}`
        : dataTransaction.nombre,
    puesto: tableSelected,
    token: md5(`${clientSelected.documento}${hashToken}`),
    guardar_vender: transactionType
      ? transactionType.guardar_vender
      : dataTransaction.guardar_vender,
    tipo_transaccion: transactionType
      ? transactionType.tipo_transaccion
      : dataTransaction.tipo_transaccion,
    idventa,
    vendedor: userData?.id,
  };
  return arrayData;
}

const generateTransaction = async ({
  listCarts,
  tableSelected,
  clientSelected,
  paymentMethods,
  transactionType,
}) => {
  let estado = false;
  let mensajeEstado = "Ocurrió un error en la transaccion.";
  let dataResponse = [];
  const userData = getUserData();
  try {
    const venta = itemsCollection(listCarts);
    const data = dataCollection(
      tableSelected,
      clientSelected,
      paymentMethods,
      listCarts,
      transactionType,
      userData
    );
    if (listCarts.length === 0) {
      // excepcion en guardar vender = 0
      throw new Error("Vaya!, No hay articulos para vender");
    }
    const listTypeTransaccionException = [0, 1, 2, 3, 4];
    if (
      paymentMethods.length === 0 &&
      !listTypeTransaccionException.includes(data.guardar_vender)
    ) {
      // excepcion en guardar vender = 0
      throw new Error("Oops! No hay metodos de pago agregados.");
    }

    await sendIndividualTransaction({ data, venta }).then((response) => {
      const { message, httpStatus } = response[0];
      if (httpStatus === 200) {
        // eslint-disable-next-line prefer-destructuring
        dataResponse = response[0];
        mensajeEstado = message;
        estado = true;
      }
    });
    return { estado, mensajeEstado, dataResponse };
  } catch (e) {
    return { estado, mensajeEstado: e.message, dataResponse };
  }
};

generateTransaction.propTypes = {
  listCarts: PropTypes.instanceOf(Array).isRequired,
  tableSelected: PropTypes.instanceOf(Array).isRequired,
  clientSelected: PropTypes.instanceOf(Array).isRequired,
  paymentMethods: PropTypes.instanceOf(Array).isRequired,
  transactionType: PropTypes.instanceOf(Array).isRequired,
};

export default generateTransaction;
