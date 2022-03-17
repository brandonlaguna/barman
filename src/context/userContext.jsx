import { createContext, useState } from "react";
import * as loginService from "../services/loginService";

const Context = createContext({});

export function AuthContextProvider({ children }) {
  const token = window.localStorage.getItem("accessToken");
  const [authState, setAuthState] = useState({ token, user: null });

  if (token != null && authState.user == null) {
    // Cerrar sesión del usuario cuando el token ha expirado
    loginService.checkAuthStatus({ accessToken: token }).then((response) => {
      if (!response.status) {
        window.localStorage.removeItem("accessToken");
        setAuthState({ token: null, user: null });
      } else {
        setAuthState({ token, user: response.data });
      }
    });
  }

  return (
    <Context.Provider value={{ authState, setAuthState }}>
      {children}
    </Context.Provider>
  );
}

export default Context;
