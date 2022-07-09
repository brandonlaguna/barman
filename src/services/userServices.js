import axios from "axios";
import headerRequest from "functions/headerRequest";
import { API_URL } from "../config/contants";

const DEFAULT_ERROR_DATA = {
  status: false,
  message: "Ha ocurrido un error al realizar la petición",
  data: [],
};

const headers = headerRequest();

export const importAllUsers = () =>
  axios
    .get(`${API_URL}/allUsers`, { headers })
    .then((response) => response.data)
    .catch(({ response }) => response.data || DEFAULT_ERROR_DATA);

export const getUserById = (id) =>
  axios
    .get(`${API_URL}/user/${id}`, { headers })
    .then((response) => response.data)
    .catch(({ response }) => response.data || DEFAULT_ERROR_DATA);
