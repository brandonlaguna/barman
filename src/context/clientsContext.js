import { createContext, useContext, useReducer, useMemo } from "react";
import PropTypes from "prop-types";

// Silpos Barman React Bar Cart context
const Client = createContext();

// Setting custom name for the context which is visible on react dev tools
Client.displayName = "ClientsContext";

// Silpos Barman React Bar Cart reducer
const initialState = {
  clients: [],
  isLoadingClients: 1,
};

function reducer(state, action) {
  const { value } = action;
  switch (action.type) {
    case "SET_CLIENTS": {
      return {
        ...state,
        clients: value,
      };
    }
    case "SET_LOADING": {
      return {
        ...state,
        isLoadingClients: value,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Silpos Barman React Bar Cart context provider
function ClientsControllerProvider({ children }) {
  const [clientsController, clientDispatch] = useReducer(reducer, initialState);

  const value = useMemo(
    () => [clientsController, clientDispatch],
    [clientsController, clientDispatch]
  );

  return <Client.Provider value={value}>{children}</Client.Provider>;
}

// Silpos Barman React custom hook for using context
function useClientsController() {
  const context = useContext(Client);

  if (!context) {
    throw new Error("useClientsController should be used inside the ClientsControllerProvider.");
  }

  return context;
}

// Typechecking props for the ClientsControllerProvider
ClientsControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const setClients = (clientDispatch, value) => clientDispatch({ type: "SET_CLIENTS", value });
const setLoadingClients = (clientDispatch, value) => clientDispatch({ type: "SET_LOADING", value });

export { ClientsControllerProvider, useClientsController, setClients, setLoadingClients };
