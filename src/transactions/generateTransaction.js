import { dataTransaction, ventaTransaction } from "model/dataTransaction";
import PropTypes from "prop-types";
import { sendIndividualTransaction } from "services/transactionServices";
import md5 from "md5";
import { getDate } from "functions/getTime";
import calculateTotal from "functions/calculateTotal";
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
      observacion: element.descripcion,
    });
  });
  return arrayItems;
}

function paymentMethodsCollection(paymentMethods) {
  const arrayPayments = [];
  paymentMethods.forEach((element) => {
    if (element.id > 0) {
      arrayPayments.push(element);
    }
  });
  return arrayPayments;
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
    clientSelected.id > 0 ? clientSelected.documento : dataTransaction.cc_cliente
  }-${getDate().toString()}`;

  const totales = calculateTotal(listCarts);
  const arrayData = {
    ...dataTransaction,
    ...totales,
    cc_cliente: clientSelected.id > 0 ? clientSelected.documento : dataTransaction.cc_cliente, // client or default
    cliente: clientSelected.id > 0 ? clientSelected.id : dataTransaction.cliente,
    nombre:
      clientSelected.id > 0
        ? `${clientSelected.razon_social} ${clientSelected.nombres} ${clientSelected.apellidos}`
        : dataTransaction.nombre,
    puesto: tableSelected,
    payments: arrayPayments,
    token: md5(`${clientSelected.documento}${hashToken}`),
    guardar_vender: transactionType
      ? transactionType.guardar_vender
      : dataTransaction.guardar_vender,
    tipo_transaccion: transactionType
      ? transactionType.tipo_transaccion
      : dataTransaction.tipo_transaccion,
    idventa,
    vendedor: userData.id
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
  let mensajeEstado = "Transaccion realizada correctamente.";
  const dataResponse = [];
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
      dataResponse.push(response[0]);
      if (response[0].httpStatus === 200) {
        mensajeEstado = "mensaje cambiado";
        // throw new Error("Ocurrió un error al realizar la venta.");
      }
    });
    estado = true;
    return [estado, mensajeEstado, dataResponse];
  } catch (e) {
    return [estado, e.message, dataResponse];
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
