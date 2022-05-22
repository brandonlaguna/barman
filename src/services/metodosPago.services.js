import axios from "axios";
import headerRequest from "functions/haderRequest";
import { API_URL } from "../config/contants";

const DEFAULT_ERROR_DATA = {
  status: false,
  message: "Ha ocurrido un error al realizar la petición",
  data: [],
};
const headers = headerRequest();

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
