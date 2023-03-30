import { createContext, useContext, useReducer, useMemo } from "react";
import PropTypes from "prop-types";

// Silpos Barman React Bar Cart context
const BarCart = createContext();

// Setting custom name for the context which is visible on react dev tools
BarCart.displayName = "ProductContext";

// Silpos Barman React Bar Cart reducer
const initialState = {
  productList: [],
};

function reducer(state, action) {
  const { value } = action;
  switch (action.type) {
    case "SET_PRODUCTS": {
      return {
        ...state,
        sendTransaction: value,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Silpos Barman React Bar Cart context provider
function ProductControllerProvider({ children }) {
  const [controllerProduct, dispatchProduct] = useReducer(reducer, initialState);

  const value = useMemo(
    () => [controllerProduct, dispatchProduct],
    [controllerProduct, dispatchProduct]
  );

  return <BarCart.Provider value={value}>{children}</BarCart.Provider>;
}

// Silpos Barman React custom hook for using context
function useBarCartController() {
  const context = useContext(BarCart);

  if (!context) {
    throw new Error("useBarCartController should be used inside the ProductControllerProvider.");
  }

  return context;
}

// Typechecking props for the ProductControllerProvider
ProductControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const setProducts = (dispatchProduct, value) => dispatchProduct({ type: "SET_PRODUCTS", value });

export { ProductControllerProvider, useBarCartController, setProducts };
