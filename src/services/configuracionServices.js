import { API_SILPOS_WEB, headers } from "../config/contants";

const DEFAULT_ERROR_DATA = {
  status: false,
  message: "Ha ocurrido un error al realizar la petición",
  data: [],
};

export const importConfiguracion = () =>
  fetch(`${API_SILPOS_WEB}/app/models/api_caja/administrador_api.php`, {
    method: "POST",
    headers,
    type: "json",
  })
    .then((response) => response.json())
    .catch(({ response }) => response.data || DEFAULT_ERROR_DATA);

export const setConfiguracion = (data) =>
  fetch(`${API_SILPOS_WEB}/app/models/api_caja/administrador_api.php`, {
    method: "POST",
    headers,
    type: "json",
    body: data,
  })
    .then((response) => response.json())
    .catch(({ response }) => response.data || DEFAULT_ERROR_DATA);
