import { createContext, useState, useMemo, useContext } from "react";
import PropTypes from "prop-types";
import * as loginService from "services/loginServices";

const Context = createContext();

function AuthContextProvider({ children }) {
  const token = window.localStorage.getItem("accessToken");
  const user = window.localStorage.getItem("userData");
  const [authState, setAuthState] = useState({ token, user: null });

  if (token != null && authState.user == null) {
    // Cerrar sesión del usuario cuando el token ha expirado
    loginService.checkAuthStatus({ accessToken: token }).then((response) => {
      console.log(response);
      if (!response.status) {
        window.localStorage.removeItem("accessToken");
        setAuthState({ token: null, user: null });
      } else {
        setAuthState({ token, user });
      }
    });
  }

  const data = useMemo(() => [authState, setAuthState]);

  return <Context.Provider value={data}>{children}</Context.Provider>;
}

function useUserContext() {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useUserContext should be used inside the BarCartControllerProvider.");
  }
  return context;
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContextProvider, useUserContext };
