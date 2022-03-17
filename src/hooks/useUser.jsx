import { useCallback, useContext } from "react";
import Context from "../context/userContext";
import * as loginService from "../services/loginService";

export default function useUser() {
  const { authState, setAuthState } = useContext(Context);

  const login = async ({ email, password }) => {
    const response = await loginService.login({ email, password });

    if (response.status) {
      const token = response.data.accessToken;
      setAuthState({ token, user: response.data });
      window.localStorage.setItem("accessToken", token);
      return Promise.resolve(true);
    }

    return Promise.reject(response.message);
  };

  const logout = () => {
    setAuthState({ token: null, user: null });
    window.localStorage.removeItem("accessToken");
  };

  const getAccessToken = useCallback(() => authState.token, [authState.token]);
  const getUserData = useCallback(() => authState.user, [authState.user]);

  return {
    isLoggedIn: Boolean(authState.token),
    login,
    logout,
    getAccessToken,
    getUserData
  };
}
