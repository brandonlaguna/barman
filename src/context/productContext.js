import { createContext, useContext, useReducer, useMemo } from "react";
import PropTypes from "prop-types";

// Silpos Barman React Bar Cart context
const Product = createContext();

// Setting custom name for the context which is visible on react dev tools
Product.displayName = "ProductContext";

// Silpos Barman React Bar Cart reducer
const initialState = {
  productList: [],
  products: [],
  isLoadingProducts: 1,
  isEdited: 0,
  categories: [],
  isLoadingCategories: 1,
  parameters: [],
  isLoadingParameters: 1,
  locations: [],
  isLoadLocations: 1,
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
    case "SET_IS_EDITED": {
      return {
        ...state,
        isEdited: value,
      };
    }
    case "SET_CATEGORIES": {
      return {
        ...state,
        categories: value,
      };
    }
    case "SET_LOADING_CATEGORIES": {
      return {
        ...state,
        isLoadingCategories: value,
      };
    }
    case "SET_PARAMETERS": {
      return {
        ...state,
        parameters: value,
      };
    }
    case "SET_LOADING_PARAMETERS": {
      return {
        ...state,
        isLoadingParameters: value,
      };
    }
    case "SET_LOCATIONS": {
      return {
        ...state,
        locations: value,
      };
    }
    case "SET_LOADING_LOCATIONS": {
      return {
        ...state,
        isLoadingLocations: value,
      };
    }
    case "REMOVE_ITEM": {
      return {
        ...state,
        products: state.products.filter((item) => item.id !== value),
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

  return <Product.Provider value={value}>{children}</Product.Provider>;
}

// Silpos Barman React custom hook for using context
function useProductController() {
  const context = useContext(Product);

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
const setIsEdited = (productDispatch, value) => productDispatch({ type: "SET_IS_EDITED", value });
const removeItem = (productDispatch, value) => productDispatch({ type: "REMOVE_ITEM", value });
const setCategories = (productDispatch, value) =>
  productDispatch({ type: "SET_CATEGORIES", value });
const setLoadingCategories = (productDispatch, value) =>
  productDispatch({ type: "SET_LOADING_CATEGORIES", value });
const setParameters = (productDispatch, value) =>
  productDispatch({ type: "SET_PARAMETERS", value });
const setLoadingParameters = (productDispatch, value) =>
  productDispatch({ type: "SET_LOADING_PARAMETERS", value });
const setLocations = (productDispatch, value) => productDispatch({ type: "SET_LOCATIONS", value });
const setLoadingLocations = (productDispatch, value) =>
  productDispatch({ type: "SET_LOADING_LOCATIONS", value });

export {
  ProductControllerProvider,
  useProductController,
  setProducts,
  setProductsList,
  setLoading,
  setIsEdited,
  removeItem,
  setCategories,
  setLoadingCategories,
  setParameters,
  setLoadingParameters,
  setLocations,
  setLoadingLocations,
};
