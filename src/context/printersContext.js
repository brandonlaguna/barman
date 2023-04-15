import { createContext, useContext, useReducer, useMemo } from "react";
import PropTypes from "prop-types";

// Silpos Barman React Bar Cart context
const Printer = createContext();

// Setting custom name for the context which is visible on react dev tools
Printer.displayName = "PrintsContext";

// Silpos Barman React Bar Cart reducer
const initialState = {
  printers: [],
  isLoadingPrinters: 1,
  isEdited: 0,
};

function reducer(state, action) {
  const { value } = action;
  switch (action.type) {
    case "SET_PRINTERS": {
      return {
        ...state,
        printers: value,
      };
    }
    case "SET_LOADING": {
      return {
        ...state,
        isLoadingPrinters: value,
      };
    }
    case "SET_EDITED": {
      return {
        ...state,
        isEdited: value,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Silpos Barman React Bar Cart context provider
function PrintersControllerProvider({ children }) {
  const [printersController, printerDispatch] = useReducer(reducer, initialState);

  const value = useMemo(
    () => [printersController, printerDispatch],
    [printersController, printerDispatch]
  );

  return <Printer.Provider value={value}>{children}</Printer.Provider>;
}

// Silpos Barman React custom hook for using context
function usePrintersController() {
  const context = useContext(Printer);

  if (!context) {
    throw new Error("usePrintersController should be used inside the PrintersControllerProvider.");
  }

  return context;
}

// Typechecking props for the PrintersControllerProvider
PrintersControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const setPrinters = (printerDispatch, value) => printerDispatch({ type: "SET_PRINTERS", value });
const setLoadingPrinters = (printerDispatch, value) =>
  printerDispatch({ type: "SET_LOADING", value });
const setEditPrinter = (printerDispatch, value) => printerDispatch({ type: "SET_EDITED", value });

export {
  PrintersControllerProvider,
  usePrintersController,
  setPrinters,
  setLoadingPrinters,
  setEditPrinter,
};
