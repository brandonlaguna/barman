/* eslint-disable no-useless-catch */
import axios from "axios";
import headerRequest from "functions/headerRequest";
import { API_SILPOS_WEB } from "../config/contants";

const DEFAULT_ERROR_DATA = {
  status: false,
  message: "Ha ocurrido un error al realizar la petición",
  data: [],
};

const headers = headerRequest();

export const importComprobantes = async () => {
  try {
    const response = await fetch(`${API_SILPOS_WEB}/app/models/api_caja/resolution_api.php`, {
      method: "POST",
      headers,
      type: "json",
    })
      .then((res) => res.json())
      .catch(({ res }) => res.data || DEFAULT_ERROR_DATA);
    return response;
  } catch (error) {
    throw error;
  }
};

export const obtenerComprobante = (idcategoria) =>
  axios
    .post(`${API_SILPOS_WEB}/app/models/api_caja/resolution_api.php`, {
      headers,
      params: { idcategoria },
    })
    .then((response) => response.data)
    .catch(({ response }) => response.data || DEFAULT_ERROR_DATA);
