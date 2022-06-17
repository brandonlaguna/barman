import axios from "axios";
import headerRequest from "functions/headerRequest";
import { API_URL } from "../../config/contants";

const DEFAULT_ERROR_DATA = {
  status: false,
  message: "Ha ocurrido un error al realizar la petición",
  data: [],
};
const headers = headerRequest();

export const importCategorias = () =>
  axios
    .get(`${API_URL}/categorias`, { headers })
    .then((response) => response.data)
    .catch(({ response }) => response.data || DEFAULT_ERROR_DATA);

export const obtenerCategoria = (idcategoria) =>
  axios
    .post(`${API_URL}/categorias`, {
      headers,
      params: { idcategoria },
    })
    .then((response) => response.data)
    .catch(({ response }) => response.data || DEFAULT_ERROR_DATA);
