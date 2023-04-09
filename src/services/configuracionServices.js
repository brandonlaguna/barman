/* eslint-disable no-useless-catch */
import headerRequest from "functions/headerRequest";
import instance from "config/instances";
import { API_SILPOS_WEB, API_URL } from "../config/contants";

const DEFAULT_ERROR_DATA = {
  status: false,
  message: "Ha ocurrido un error al realizar la petición",
  data: [],
  status_code: 500,
};

const headers = headerRequest();

instance.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("accessToken");
    const businessData = JSON.parse(window.localStorage.getItem("businessData"));
    // eslint-disable-next-line no-param-reassign
    config.baseURL = API_URL;
    // eslint-disable-next-line no-param-reassign
    config.headers.authorization = `Bearer ${token}`;
    // eslint-disable-next-line no-param-reassign
    config.headers.dbu = businessData.dbuser;
    // eslint-disable-next-line no-param-reassign
    config.headers.dbp = businessData.dbpass;
    // eslint-disable-next-line no-param-reassign
    config.headers.dbd = businessData.dbname;
    // eslint-disable-next-line no-param-reassign
    config.headers.Company = businessData.id;
    return config;
  },
  (error) => Promise.reject(error)
);

export const importConfiguracion = async () => {
  try {
    const response = await fetch(`${API_SILPOS_WEB}/app/models/api_caja/administrador_api.php`, {
      method: "POST",
      headers,
      type: "json",
    })
      .then((res) => res.json())
      .catch(({ res }) => res.data || DEFAULT_ERROR_DATA);
    return response;
  } catch (error) {
    throw error;
  }
};

export const setConfiguracion = (data) =>
  fetch(`${API_SILPOS_WEB}/app/models/api_caja/administrador_api.php`, {
    method: "POST",
    headers,
    type: "json",
    body: data,
  })
    .then((response) => response.json())
    .catch(({ response }) => response.data || DEFAULT_ERROR_DATA);

export const importPrinterConfiguracion = async () => {
  try {
    const response = await instance
      .get(`/printers`, { headers })
      .then((res) => res.data)
      .catch(({ res }) => res.data || DEFAULT_ERROR_DATA);
    return response;
  } catch (error) {
    throw error;
  }
};

export const savePrinter = async (params) => {
  try {
    const response = await instance
      .post(`${API_URL}/printers`, params, { headers })
      .then((res) => res)
      .catch(({ res }) => res || DEFAULT_ERROR_DATA);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updatePrinter = async (params) => {
  try {
    const response = await instance
      .put(`${API_URL}/printers`, params)
      .then((res) => res)
      .catch(({ res }) => res || DEFAULT_ERROR_DATA);
    return response;
  } catch (error) {
    return error;
  }
};

export const deletePrinter = async (dataPrinter) => {
  try {
    const response = await instance
      .delete(`${API_URL}/printers`, { data: dataPrinter })
      .then((res) => res)
      .catch(({ res }) => res || DEFAULT_ERROR_DATA);
    return response;
  } catch (error) {
    return error;
  }
};

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
