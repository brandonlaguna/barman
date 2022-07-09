import axios from "axios";
import headerRequest from "functions/headerRequest";
import { API_URL } from "../config/contants";

const DEFAULT_ERROR_DATA = {
  status: false,
  message: "Ha ocurrido un error al realizar la petición",
  data: [],
};
const headers = headerRequest();

export const importTipoTransacciones = () =>
  axios
    .get(`${API_URL}/tipos_transacciones`, { headers })
    .then((response) => response.data)
    .catch(({ response }) => response.data || DEFAULT_ERROR_DATA);

export const obtenerTipoTransaccion = (tipoTransaccion) =>
  axios
    .post(`${API_URL}/tipos_transacciones`, {
      headers,
      params: { tipoTransaccion },
    })
    .then((response) => response.data)
    .catch(({ response }) => response.data || DEFAULT_ERROR_DATA);
