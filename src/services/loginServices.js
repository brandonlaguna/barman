import axios from "axios";
import { API_URL } from "../components/Common/constants";

const DEFAULT_ERROR_DATA = {
  status: false,
  message: "Ha ocurrido un error al realizar la petición",
  data: [],
};

export const login = ({ email, password }) => {
  return axios
    .post(
      `${API_URL}/login`,
      {
        logUsuario: email,
        passwordUsuario: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => response.data)
    .catch(({ response }) => response.data || DEFAULT_ERROR_DATA);
};

export const checkAuthStatus = ({ accessToken }) => {
  return axios
    .post(
      `${API_URL}/auth/checkAuthStatus`,
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
};
