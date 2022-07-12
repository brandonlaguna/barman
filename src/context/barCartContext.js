import { createContext, useContext, useReducer, useMemo } from "react";
import PropTypes from "prop-types";

// Silpos Barman React Bar Cart context
const BarCart = createContext();

// Setting custom name for the context which is visible on react dev tools
BarCart.displayName = "BarCartContext";

// Silpos Barman React Bar Cart reducer
const initialState = {
  listCarts: [],
  listTables: 42,
  tableSelected: false,
  clientSelected: [],
  paymentMethods: [],
  paymentSelected: false,
  transactionType: null,
  sendTransaction: false,
  launchTransaction: false,
  launchPrinter: false,
  printPrinter: "",
};

function reducer(state, action) {
  const { value } = action;
  switch (action.type) {
    case "ADD_ITEM_TO_CART": {
      const itemInCart = state.listCarts.find((item) => item.id === value.id);
      return itemInCart
        ? {
            ...state,
            listCarts: state.listCarts.map((item) =>
              item.id === value.id
                ? { ...item, observacion: "", cantidad: item.cantidad + 1 }
                : item
            ),
          }
        : {
            ...state,
            listCarts: [...state.listCarts, { ...value, observacion: "", cantidad: 1 }],
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
      console.log("agregando cliente", value);
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
      return {
        ...state,
        transactionType: value,
      };
    }
    case "SEND_TRANSACTION": {
      return {
        ...state,
        sendTransaction: value,
      };
    }
    case "LAUNCH_TRANSACTION": {
      return {
        ...state,
        launchTransaction: value,
      };
    }
    case "LAUNCH_PRINTER": {
      return {
        ...state,
        launchPrinter: value,
      };
    }
    case "SET_PRINT_PRINTER": {
      return {
        ...state,
        printPrinter: value,
      };
    }
    case "RESET_CART": {
      return initialState;
    }
    case "RESET_ITEMS_CART": {
      return {
        ...state,
        listCarts: [],
      };
    }
    case "UPDATE_ITEM_CART": {
      return {
        ...state,
        listCarts: state.listCarts.map((item) => (item.id === value.id ? value : item)),
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Silpos Barman React Bar Cart context provider
function BarCartControllerProvider({ children }) {
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
const sendTransaction = (dispatchBar, value) => dispatchBar({ type: "SEND_TRANSACTION", value });
const setLaunchTransaction = (dispatchBar, value) =>
  dispatchBar({ type: "LAUNCH_TRANSACTION", value });
const setLaunchPrinter = (dispatchBar, value) => dispatchBar({ type: "LAUNCH_PRINTER", value });
const setPrintPrinter = (dispatchBar, value) => dispatchBar({ type: "SET_PRINT_PRINTER", value });
const clean = (dispatchBar, value) => dispatchBar({ type: "RESET_CART", value });
const resetItemsCart = (dispatchBar, value) => dispatchBar({ type: "RESET_ITEMS_CART", value });
const updateItemCart = (dispatchBar, value) => dispatchBar({ type: "UPDATE_ITEM_CART", value });

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
  sendTransaction,
  setLaunchTransaction,
  setLaunchPrinter,
  setPrintPrinter,
  clean,
  resetItemsCart,
  updateItemCart,
};
