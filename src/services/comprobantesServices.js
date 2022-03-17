import axios from "axios";
import { API_SILPOS_WEB, headers } from "../config/contants";

const DEFAULT_ERROR_DATA = {
  status: false,
  message: "Ha ocurrido un error al realizar la petición",
  data: [],
};

export const importComprobantes = () =>
  fetch(`${API_SILPOS_WEB}/app/models/api_caja/resolution_api.php`, {
    method: "POST",
    headers,
    type: "json",
  })
    .then((response) => response.json())
    .catch(({ response }) => response.data || DEFAULT_ERROR_DATA);

export const obtenerComprobante = (idcategoria) =>
  axios
    .post(`${API_SILPOS_WEB}/app/models/api_caja/resolution_api.php`, {
      headers,
      params: { idcategoria },
    })
    .then((response) => response.data)
    .catch(({ response }) => response.data || DEFAULT_ERROR_DATA);
