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
      const itemToRemove = state.listCarts.find((item) => item.id === value);
      return itemToRemove.cantidad > 1
        ? {
            ...state,
            listCarts: state.listCarts.map((item) =>
              item.id === value ? { ...item, cantidad: item.cantidad - 1 } : item
            ),
          }
        : {
            ...state,
            listCarts: state.listCarts.filter((item) => item.id !== value),
          };
    }
    case "SET_TABLE_TO_CART": {
      return {
        ...state,
        tableSelected: value,
        transactionType: {
          guardar_vender: 0,
          tipo_transaccion: 0,
        },
      };
    }
    case "SET_CLIENT_TO_CART": {
      return {
        ...state,
        clientSelected: value,
      };
    }
    case "ADD_PAYMENT_METHOD": {
      const paymentToRemove = state.paymentMethods.find((item) => item.id === value.id);
      return paymentToRemove !== undefined
        ? {
            ...state,
            paymentSelected: true,
            paymentMethods: state.paymentMethods.map((item) =>
              item.id === value.id ? value : item
            ),
          }
        : {
            ...state,
            paymentSelected: true,
            paymentMethods: [...state.paymentMethods, value],
          };
    }
    case "REMOVE_PAYMENT_METHOD": {
      return {
        ...state,
        paymentMethods: state.paymentMethods.filter((payment) => payment.id !== value.id),
      };
    }
    case "ADD_TRANSACTION_TYPE": {
      console.log(value);
      return {
        ...state,
        transactionType: value,
      };
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
    listTables: 60,
    tableSelected: false,
    clientSelected: [],
    paymentMethods: [],
    paymentSelected: false,
    transactionType: null,
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
const setTableToCart = (dispatchBar, value) => dispatchBar({ type: "SET_TABLE_TO_CART", value });
const selectClientToCart = (dispatchBar, value) =>
  dispatchBar({ type: "SET_CLIENT_TO_CART", value });
const addPaymentMethod = (dispatchBar, value) => dispatchBar({ type: "ADD_PAYMENT_METHOD", value });
const removePaymentMethod = (dispatchBar, value) =>
  dispatchBar({ type: "REMOVE_PAYMENT_METHOD", value });
const setTransactionType = (dispatchBar, value) =>
  dispatchBar({ type: "ADD_TRANSACTION_TYPE", value });

export {
  BarCartControllerProvider,
  useBarCartController,
  addItemToCart,
  deleteToCart,
  setTableToCart,
  selectClientToCart,
  addPaymentMethod,
  removePaymentMethod,
  setTransactionType,
};
