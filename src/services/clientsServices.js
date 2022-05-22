import axios from "axios";
import headerRequest from "functions/haderRequest";
import { API_URL } from "../config/contants";

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
