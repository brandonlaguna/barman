/* eslint-disable no-useless-catch */
import axios from "axios";
import headerRequest from "functions/headerRequest";
import instance from "config/instances";
import { API_URL } from "../config/contants";

const DEFAULT_ERROR_DATA = {
  status: false,
  message: "Ha ocurrido un error al realizar la petición",
  data: [],
};
const headers = headerRequest();

instance.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("accessToken");
    const businessData = JSON.parse(window.localStorage.getItem("businessData"));
    // eslint-disable-next-line no-param-reassign
    config.baseURL = API_URL;
    // eslint-disable-next-line no-param-reassign
    config.headers.authorization = `Bearer ${token}`;
    // eslint-disable-next-line no-param-reassign
    config.headers.dbu = businessData.dbuser;
    // eslint-disable-next-line no-param-reassign
    config.headers.dbp = businessData.dbpass;
    // eslint-disable-next-line no-param-reassign
    config.headers.dbd = businessData.dbname;
    // eslint-disable-next-line no-param-reassign
    config.headers.Company = businessData.id;
    return config;
  },
  (error) => Promise.reject(error)
);

export const importMetodosPago = async () => {
  try {
    const response = await instance
      .get(`/metodos_pago`, { headers })
      .then((res) => res.data)
      .catch(({ res }) => res.data || DEFAULT_ERROR_DATA);
    return response;
  } catch (error) {
    throw error;
  }
};

export const obtenerMetodoPago = (metodoPago) =>
  axios
    .post(`${API_URL}/metodos_pago`, {
      headers,
      params: { metodoPago },
    })
    .then((response) => response.data)
    .catch(({ response }) => response.data || DEFAULT_ERROR_DATA);
