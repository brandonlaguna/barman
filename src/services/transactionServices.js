import axios from "axios";
import headerRequest from "functions/headerRequest";
import { API_SILPOS_WEB, API_CAJA_SOURCE } from "../../config/contants";

const DEFAULT_ERROR_DATA = {
  status: false,
  message: "Ha ocurrido un error al realizar la petición",
  data: [],
};
const headers = headerRequest();

export const sendIndividualTransaction = ({ data, venta }) =>
  axios
    .post(`${API_SILPOS_WEB}${API_CAJA_SOURCE}/indexApi.php`, { data: [data], venta }, { headers })
    .then((response) => response.data)
    .catch(({ response }) => response.data || DEFAULT_ERROR_DATA);

export const sendMassiveTransactions = ({ data, venta }) =>
  axios
    .post(
      `${API_SILPOS_WEB}${API_CAJA_SOURCE}/tipos_transacciones`,
      {
        data,
        venta,
      },
      { headers }
    )
    .then((response) => response.data)
    .catch(({ response }) => response.data || DEFAULT_ERROR_DATA);
