import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_USAGE } from "config/contants";
import { useUserContext } from "context/userContext";
import * as loginService from "services/loginServices";

export default function useUser() {
  const [authState, setAuthState] = useUserContext();
  const navigate = useNavigate();

  const login = async ({ user, password }) => {
    const response = await loginService.login({ user, password });
    const { data } = response;
    if (data.status) {
      window.localStorage.setItem("accessToken", data.token);
      window.localStorage.setItem("userData", JSON.stringify(data.data[0]));
      window.localStorage.setItem("businessData", JSON.stringify(data.dataEmpresas[0]));
      setAuthState({ token: data.token, user: data.data[0] });
      return Promise.resolve(true);
    }

    return Promise.reject(response.message);
  };

  const logout = () => {
    console.log("ahora si a deslogear");
    setAuthState({ token: null, user: null });
    LOCAL_STORAGE_USAGE.forEach((k) => localStorage.removeItem(k));
    navigate("/login");
  };

  const getAccessToken = useCallback(() => authState?.token, [authState?.token]);
  const getUserData = useCallback(() => authState?.user, [authState?.user]);

  return {
    isLoggedIn: Boolean(authState?.token),
    login,
    logout,
    getAccessToken,
    getUserData,
  };
}
