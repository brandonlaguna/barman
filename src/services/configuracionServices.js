import { API_SILPOS_WEB, headers } from "../config/contants";

const DEFAULT_ERROR_DATA = {
  status: false,
  message: "Ha ocurrido un error al realizar la petición",
  data: [],
};

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
  fetch(`${API_SILPOS_WEB}/app/models/api_caja/printers.php`, {
    method: "GET",
    headers,
    type: "json",
  })
    .then((response) => response.json())
    .catch(({ response }) => response.data || DEFAULT_ERROR_DATA);

export const generateDefaultPrinters = () => [
  {
    printerId: 1,
    printerName: "SAT15TUS(USB)",
    printerType: {
      type: "POS",
      format: "80mm",
    },
    printerRoute: "USB",
    printerState: true,
    printerFormat: [
      `systemName`,
      `businessName`,
      `businessTypeDocument businessDocument`,
      // `{{businessAddress}}`,
      // `{{businessCity}}`,
      // `P.B.X: {{businessPBX}} Cel: {{businessPhone}}`,
      // `_____________________________`,
      // `{{typeTransaction}} {{numberTransaction}}`,
      `_____________________________`,
      `Hora: transactionTime Fecha: transactionDate`,
      `DOCUMENTO: clientDocument`,
      `CLIENTE: clientName`,
      `DIR: clientAddress`,
      `CIUDAD: clientCity`,
      `TEL: clientPhone`,
      `_____________________________`,
      `{{minItems}}`,
      // `_____________________________`,
      // `P. VOLUNTARIA {{voluntaryTip}}`,
      // `TOTAL FACTURA {{totalTransaction}}`,
      // `CANCELO {{totalPayed}}`,
      // `CAMBIO {{totalCambio}}`,
      // `TOTAL PRODUCTOS {{totalItems}}`,
      // `ESTADO {{transactionState}}
      // F O R M A D E P A G O `,
      // `_____________________________`,
      // `{{paymentMethods}}`,
      // `_____________________________`,
      // `No responsable de IVA`,
      // `RESOLUCION DE AUTORIZACION`,
      // `No. 123456 DEL 2021-10-14 HASTA 2022-10-14`,
      // `NUMERACION DESDE 1 HASTA 100000`,
      // `{{footer}}`,
    ],
  },
  {
    printerId: 2,
    printerName: "SAT15TUS(USB)",
    printerType: {
      type: "POS",
      format: "80mm",
    },
    printerRoute: "USB",
    printerState: true,
    printerFormat: [
      `Silpos Barman 2`,
      `{{minBusiness}}`,
      `***Bar***`,
      `{{minItems}}`,
      `{{minFooter}}`,
    ],
  },
];
