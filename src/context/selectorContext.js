import { createContext, useContext, useReducer, useMemo } from "react";
import PropTypes from "prop-types";

// Silpos Barman React Selector context
const Selector = createContext();

// Setting custom name for the context which is visible on react dev tools
Selector.displayName = "selectorContext";

// Silpos Barman React Selector reducer

function reducer(state, action) {
  const { value } = action;
  switch (action.type) {
    case "LOADER": {
      return {
        ...state,
        isLoading: value,
      };
    }
    case "MESSAGE_LOADER": {
      return {
        ...state,
        messageLoader: value,
      };
    }
    case "SET_METODOS_PAGO": {
      return {
        ...state,
        metodosPago: value,
      };
    }
    case "SET_LOADING_METODOS_PAGO": {
      return {
        ...state,
        isLoadingMetodosPago: value,
      };
    }
    case "SET_TIPOS_TRANSACCIONES": {
      return {
        ...state,
        tiposTransacciones: value,
      };
    }
    case "SET_LOADING_TIPOS_TRANSACCIONES": {
      return {
        ...state,
        isLoadingTiposTransacciones: value,
      };
    }
    case "SET_ADMINISTRADOR": {
      return {
        ...state,
        administrador: value,
      };
    }
    case "SET_LOADING_ADMINISTRADOR": {
      return {
        ...state,
        isLoadingAdministrador: value,
      };
    }
    case "SET_COMPROBANTES": {
      return {
        ...state,
        comprobantes: value,
      };
    }
    case "SET_LOADING_COMPROBANTES": {
      return {
        ...state,
        isLoadingComprobantes: value,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Silpos Barman React Selector context provider
function SelectorProvider({ children }) {
  const initialState = {
    isLoading: false,
    messageLoader: "",
    isOnline: true,
    metodosPago: [],
    isLoadingMetodosPago: 1,
    tiposTransacciones: [],
    isLoadingTiposTransacciones: 1,
    administrador: {},
    isLoadingAdministrador: 1,
    comprobantes: [],
    isLoadingComprobantes: 1,
  };

  const [controllerSelector, dispatchSelector] = useReducer(reducer, initialState);

  const value = useMemo(
    () => [controllerSelector, dispatchSelector],
    [controllerSelector, dispatchSelector]
  );

  return <Selector.Provider value={value}>{children}</Selector.Provider>;
}

// Silpos Barman React custom hook for using context
function useSelectorController() {
  const context = useContext(Selector);

  if (!context) {
    throw new Error("useSelectorController should be used inside the SelectorProvider.");
  }

  return context;
}

// Typechecking props for the SelectorProvider
SelectorProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const setIsLoading = (dispatchSelector, value) => dispatchSelector({ type: "LOADER", value });
const setMessageLoader = (dispatchSelector, value) =>
  dispatchSelector({ type: "MESSAGE_LOADER", value });
const setMetodosPago = (dispatchSelector, value) =>
  dispatchSelector({ type: "SET_METODOS_PAGO", value });
const setIsLoadingMetodosPago = (dispatchSelector, value) =>
  dispatchSelector({ type: "SET_LOADING_METODOS_PAGO", value });
const setTiposTransacciones = (dispatchSelector, value) =>
  dispatchSelector({ type: "SET_TIPOS_TRANSACCIONES", value });
const setIsLoadingTiposTransacciones = (dispatchSelector, value) =>
  dispatchSelector({ type: "SET_LOADING_TIPOS_TRANSACCIONES", value });
const setAdministrador = (dispatchSelector, value) =>
  dispatchSelector({ type: "SET_ADMINISTRADOR", value });
const setIsLoadingAdministrador = (dispatchSelector, value) =>
  dispatchSelector({ type: "SET_LOADING_ADMINISTRADOR", value });
const setComprobantes = (dispatchSelector, value) =>
  dispatchSelector({ type: "SET_COMPROBANTES", value });
const setIsLoadingComprobantes = (dispatchSelector, value) =>
  dispatchSelector({ type: "SET_LOADING_COMPROBANTES", value });

export {
  SelectorProvider,
  useSelectorController,
  setIsLoading,
  setMessageLoader,
  setMetodosPago,
  setIsLoadingMetodosPago,
  setTiposTransacciones,
  setIsLoadingTiposTransacciones,
  setAdministrador,
  setIsLoadingAdministrador,
  setComprobantes,
  setIsLoadingComprobantes,
};
