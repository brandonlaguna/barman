import axios from "axios";
import headerRequest from "functions/headerRequest";
import { API_URL, API_SILPOS_WEB } from "../../config/contants";

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
    .post(`${API_URL}/clients/store`, params, { headers })
    .then((response) => response)
    .catch(({ response }) => response || DEFAULT_ERROR_DATA);

export const saveClientFetch = (params) =>
  fetch(`${API_SILPOS_WEB}/api/cliente/store`, {
    method: "POST",
    headers,
    data: params,
  })
    .then((response) => response.json())
    .catch(({ response }) => response.data || DEFAULT_ERROR_DATA);

export const updateClient = (params) =>
  axios
    .put(`${API_SILPOS_WEB}/api/cliente/update/${params.id}`, {
      headers,
      params,
    })
    .then((response) => response)
    .catch(({ response }) => response || DEFAULT_ERROR_DATA);

export const deleteClient = (id) =>
  axios
    .put(`${API_SILPOS_WEB}/api/cliente/update/${id}`, {
      headers,
    })
    .then((response) => response)
    .catch(({ response }) => response || DEFAULT_ERROR_DATA);
