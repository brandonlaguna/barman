import { dataTransaction, ventaTransaction } from "model/dataTransaction";
import PropTypes from "prop-types";
import { sendIndividualTransaction } from "services/transactionServices";
import md5 from "md5";
import { getDate } from "functions/getTime";
import calculateTotal from "functions/calculateTotal";

const idventa = Math.floor(Math.random() * 1000);

function itemsCollection(listCarts) {
  const arrayItems = [];
  console.log("itemes", listCarts);
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
    });
  });
  return arrayItems;
}

function paymentMethodsCollection(paymentMethods) {
  const arrayPayments = [];
  console.log(paymentMethods);
  paymentMethods.forEach((element) => {
    // console.log(element);
    if (element.id > 0) {
      arrayPayments.push(element);
    }
  });
  return arrayPayments;
}

function dataCollection(tableSelected, clientSelected, paymentMethods, listCarts, transactionType) {
  const arrayPayments = paymentMethodsCollection(paymentMethods);

  const hashToken = `${
    clientSelected.length > 0 ? clientSelected.documento : dataTransaction.cc_cliente
  }-${getDate().toString()}`;

  const totales = calculateTotal(listCarts);
  console.log("transactionType", transactionType);

  const arrayData = {
    ...dataTransaction,
    ...totales,
    cc_cliente: clientSelected.length > 0 ? clientSelected.documento : dataTransaction.cc_cliente, // client or default
    cliente: clientSelected.length > 0 ? clientSelected.id : dataTransaction.cliente,
    nombre:
      clientSelected.length > 0
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
  let mensajeEstado = "Oh! No se pudo realizar ésta venta.";
  let dataResponse = [];
  try {
    const venta = itemsCollection(listCarts);

    const data = dataCollection(
      tableSelected,
      clientSelected,
      paymentMethods,
      listCarts,
      transactionType
    );

    console.log([venta, data]);
    if (paymentMethods.length === 0 && data.guardar_vender !== 0) {
      // excepcion en guardar vender = 0
      throw new Error("Oops! No hay metodos de pago agregados.");
    }

    sendIndividualTransaction({ data, venta }).then((response) => {
      console.log(response);
    });
    estado = true;
    dataResponse = [];
  } catch (e) {
    mensajeEstado = e;
  }
  return [estado, mensajeEstado, dataResponse];
};

generateTransaction.propTypes = {
  listCarts: PropTypes.instanceOf(Array).isRequired,
  tableSelected: PropTypes.instanceOf(Array).isRequired,
  clientSelected: PropTypes.instanceOf(Array).isRequired,
  paymentMethods: PropTypes.instanceOf(Array).isRequired,
  transactionType: PropTypes.instanceOf(Array).isRequired,
};

export default generateTransaction;
