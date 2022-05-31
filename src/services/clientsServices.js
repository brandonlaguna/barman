import axios from "axios";
import headerRequest from "functions/headerRequest";
import { API_URL, API_SILPOS_WEB } from "../config/contants";

const DEFAULT_ERROR_DATA = {
  status: false,
  message: "Ha ocurrido un error al realizar la petición",
  data: [],
};
const headers = headerRequest();

export const importClientes = () =>
  axios
    .get(`${API_URL}/clientes`, { headers })
    .then((response) => response.data)
    .catch(({ response }) => response.data || DEFAULT_ERROR_DATA);

export const obtenerCliente = (idcliente) =>
  axios
    .post(`${API_URL}/clientes`, {
      headers,
      params: { idcliente },
    })
    .then((response) => response.data)
    .catch(({ response }) => response.data || DEFAULT_ERROR_DATA);

export const saveClient = (params) =>
  axios
    .post(`${API_SILPOS_WEB}/app/controller/clientsController.php`, {
      headers,
      params,
    })
    .then((response) => response)
    .catch(({ response }) => response || DEFAULT_ERROR_DATA);
