import { createContext, useContext, useReducer, useMemo } from "react";
import PropTypes from "prop-types";

// Silpos Barman React Bar Cart context
const BarCart = createContext();

// Setting custom name for the context which is visible on react dev tools
BarCart.displayName = "ProductContext";

// Silpos Barman React Bar Cart reducer
const initialState = {
  productList: [],
  products: [],
  isLoadingProducts: 1,
};

function reducer(state, action) {
  const { value } = action;
  switch (action.type) {
    case "SET_PRODUCTS_LIST": {
      return {
        ...state,
        sendTransaction: value,
      };
    }
    case "SET_PRODUCTS": {
      return {
        ...state,
        products: value,
      };
    }
    case "SET_LOADING": {
      return {
        ...state,
        isLoadingProducts: value,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Silpos Barman React Bar Cart context provider
function ProductControllerProvider({ children }) {
  const [controllerProduct, productDispatch] = useReducer(reducer, initialState);

  const value = useMemo(
    () => [controllerProduct, productDispatch],
    [controllerProduct, productDispatch]
  );

  return <BarCart.Provider value={value}>{children}</BarCart.Provider>;
}

// Silpos Barman React custom hook for using context
function useProductController() {
  const context = useContext(BarCart);

  if (!context) {
    throw new Error("useProductController should be used inside the ProductControllerProvider.");
  }

  return context;
}

// Typechecking props for the ProductControllerProvider
ProductControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const setProductsList = (productDispatch, value) =>
  productDispatch({ type: "SET_PRODUCTS_LIST", value });
const setProducts = (productDispatch, value) => productDispatch({ type: "SET_PRODUCTS", value });
const setLoading = (productDispatch, value) => productDispatch({ type: "SET_LOADING", value });

export {
  ProductControllerProvider,
  useProductController,
  setProducts,
  setProductsList,
  setLoading,
};
