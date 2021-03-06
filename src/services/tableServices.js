import axios from "axios";
import headerRequest from "functions/headerRequest";
import { API_SILPOS_WEB } from "../config/contants";

const DEFAULT_ERROR_DATA = {
  status: false,
  message: "Ha ocurrido un error al realizar la petición",
  data: [],
};
const headers = headerRequest();

export const importBusyTables = () =>
  axios
    .post(`${API_SILPOS_WEB}/app/models/bar_mobil/index.php`, {}, { headers })
    .then((response) => response.data)
    .catch(({ response }) => response.data || DEFAULT_ERROR_DATA);

export const changeTable = (params) =>
  axios
    .post(`${API_SILPOS_WEB}/app/views/cajabar/php/cambioMesa.php`, params, { headers })
    .then((response) => response)
    .catch(({ response }) => response.data || DEFAULT_ERROR_DATA);
