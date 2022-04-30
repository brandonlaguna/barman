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

export { SelectorProvider, useSelectorController, setIsLoading, setMessageLoader };
