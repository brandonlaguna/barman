import axios from "axios";
import headerRequest from "functions/headerRequest";
import { API_SILPOS_WEB, API_URL } from "../../config/contants";

const DEFAULT_ERROR_DATA = {
  status: false,
  message: "Ha ocurrido un error al realizar la petición",
  data: [],
};

const headers = headerRequest();

export const importConfiguracion = () =>
  fetch(`${API_SILPOS_WEB}/app/models/api_caja/administrador_api.php`, {
    method: "POST",
    headers,
    type: "json",
  })
    .then((response) => response.json())
    .catch(({ response }) => response.data || DEFAULT_ERROR_DATA);

export const setConfiguracion = (data) =>
  fetch(`${API_SILPOS_WEB}/app/models/api_caja/administrador_api.php`, {
    method: "POST",
    headers,
    type: "json",
    body: data,
  })
    .then((response) => response.json())
    .catch(({ response }) => response.data || DEFAULT_ERROR_DATA);

export const importPrinterConfiguracion = () =>
  fetch(`${API_URL}/printers`, {
    method: "GET",
    headers,
    type: "json",
  })
    .then((response) => response.json())
    .catch(({ response }) => response.data || DEFAULT_ERROR_DATA);

export const savePrinter = (params) =>
  axios
    .post(`${API_URL}/printers/store`, params, { headers })
    .then((response) => response.json())
    .catch(({ response }) => response.data || DEFAULT_ERROR_DATA);

export const updatePrinter = (params) =>
  axios.put
    .post(`${API_SILPOS_WEB}/api/impresora/update/${params.id}`, {
      headers,
      params,
    })
    .then((response) => response.json())
    .catch(({ response }) => response.data || DEFAULT_ERROR_DATA);

export const deletePrinter = (id) =>
  axios.delete
    .post(`${API_SILPOS_WEB}/api/impresora/delete/${id}`, {
      headers,
    })
    .then((response) => response.json())
    .catch(({ response }) => response.data || DEFAULT_ERROR_DATA);

export const generateDefaultPrinters = () => [
  {
    printerId: 1,
    printerName: "EPSON TM-T20 Receipt",
    printerType: {
      type: "POS",
      format: "80mm",
    },
    printerRoute: "USB",
    printerState: true,
    printerFormat: [
      `systemName`,
      `businessName`,
      `NIT businessDocument`,
      `businessAddress`,
      `businessCity`,
      `P.B.X: businessPBX Cel: businessPhone`,
      `_____________________________`,
      `Venta numberTransaction`,
      `_____________________________`,
      `Hora: transactionTime Fecha: transactionDate`,
      `DOCUMENTO: clientDocument`,
      `CLIENTE: clientName`,
      // `DIR: clientAddress`,
      // `CIUDAD: clientCity`,
      // `TEL: clientPhone`,
      `_____________________________`,
      `{{items}}`,
      `_____________________________`,
      `{{totalTransaction}}`,
      `F O R M A D E P A G O `,
      `_____________________________`,
      `{{paymentMethods}}`,
      `_____________________________`,
      `{{footer}}`,
    ],
  },
  {
    printerId: 2,
    printerName: "EPSON TM-T20 Receipt",
    printerType: {
      type: "POS",
      format: "80mm",
    },
    printerRoute: "USB",
    printerState: true,
    printerFormat: [
      `Silpos Barman`,
      `businessName`,
      `***Cocina***`,
      `MESA# tableNumber`,
      `{{minItems}}`,
    ],
  },
];
