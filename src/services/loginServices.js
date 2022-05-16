import axios from "axios";
import { API_URL } from "config/contants";

const DEFAULT_ERROR_DATA = {
  status: false,
  message: "Ha ocurrido un error al realizar la petición",
  data: [],
};

export const login = async ({ user, password }) =>
  axios
    .post(
      `${API_URL}/login`,
      {
        user,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => response.data)
    .catch(({ response }) => response.data || DEFAULT_ERROR_DATA);

export const checkAuthStatus = ({ accessToken }) =>
  axios
    .post(
      `${API_URL}/checkAuthStatus`,
      {
        accessToken,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => response.data)
    .catch(({ response }) => response.data || DEFAULT_ERROR_DATA);
