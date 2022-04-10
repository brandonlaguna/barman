import axios from "axios";
import { API_URL, headers } from "../config/contants";

const DEFAULT_ERROR_DATA = {
  status: false,
  message: "Ha ocurrido un error al realizar la petición",
  data: [],
};

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
