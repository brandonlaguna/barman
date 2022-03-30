import { createContext, useContext, useReducer, useMemo } from "react";
import PropTypes from "prop-types";

// Silpos Barman React Bar Cart context
const BarCart = createContext();

// Setting custom name for the context which is visible on react dev tools
BarCart.displayName = "BarCartContext";

// Silpos Barman React Bar Cart reducer

function reducer(state, action) {
  const { value } = action;
  switch (action.type) {
    case "ADD_ITEM_TO_CART": {
      const itemInCart = state.listCarts.find((item) => item.id === value.id);
      return itemInCart
        ? {
            ...state,
            listCarts: state.listCarts.map((item) =>
              item.id === value.id ? { ...item, cantidad: item.cantidad + 1 } : item
            ),
          }
        : {
            ...state,
            listCarts: [...state.listCarts, { ...value, cantidad: 1 }],
          };
    }
    case "REMOVE_ITEM_TO_CART": {
      console.log("removiendo");
      return value;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Silpos Barman React Bar Cart context provider
function BarCartControllerProvider({ children }) {
  const initialState = {
    listCarts: [],
    listMesas: [],
  };

  const [controllerBar, dispatchBar] = useReducer(reducer, initialState);

  const value = useMemo(() => [controllerBar, dispatchBar], [controllerBar, dispatchBar]);

  return <BarCart.Provider value={value}>{children}</BarCart.Provider>;
}

// Silpos Barman React custom hook for using context
function useBarCartController() {
  const context = useContext(BarCart);

  if (!context) {
    throw new Error("useBarCartController should be used inside the BarCartControllerProvider.");
  }

  return context;
}

// Typechecking props for the BarCartControllerProvider
BarCartControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const addItemToCart = (dispatchBar, value) => dispatchBar({ type: "ADD_ITEM_TO_CART", value });
const deleteToCart = (dispatchBar, value) => dispatchBar({ type: "REMOVE_ITEM_TO_CART", value });

// const addItemToCart = (dispatchBar, value) => {
//   console.log(dispatchBar);
//   console.log(value);
// };

export { BarCartControllerProvider, useBarCartController, addItemToCart, deleteToCart };
