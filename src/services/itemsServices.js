import axios from "axios";
import { API_URL, headers } from "../config/contants";

const DEFAULT_ERROR_DATA = {
  status: false,
  message: "Ha ocurrido un error al realizar la petición",
  data: [],
};

export const importItems = () =>
  axios
    .get(`${API_URL}/productos`, { headers })
    .then((response) => response.data)
    .catch(({ response }) => response.data || DEFAULT_ERROR_DATA);

export const obtenerItem = (idarticulo) =>
  axios
    .post(`${API_URL}/producto`, {
      headers,
      params: { idarticulo },
    })
    .then((response) => response.data)
    .catch(({ response }) => response.data || DEFAULT_ERROR_DATA);
