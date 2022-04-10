import axios from "axios";
import { API_URL, headers } from "../config/contants";

const DEFAULT_ERROR_DATA = {
  status: false,
  message: "Ha ocurrido un error al realizar la petición",
  data: [],
};

export const importMetodosPago = () =>
  axios
    .get(`${API_URL}/metodos_pago`, { headers })
    .then((response) => response.data)
    .catch(({ response }) => response.data || DEFAULT_ERROR_DATA);

export const obtenerMetodoPago = (metodoPago) =>
  axios
    .post(`${API_URL}/metodos_pago`, {
      headers,
      params: { metodoPago },
    })
    .then((response) => response.data)
    .catch(({ response }) => response.data || DEFAULT_ERROR_DATA);
