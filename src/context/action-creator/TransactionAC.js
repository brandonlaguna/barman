import { setIsLoading, setResponseTransaction } from "context/selectorContext";
import { toast } from "react-toastify";
import generateTransaction from "transactions/generateTransaction";

export const sendTransactionAC = (
  dispatch,
  { tableSelected, clientSelected, paymentMethods, listCarts, transactionType, userData }
) => {
  setIsLoading(dispatch, 2);
  generateTransaction({
    tableSelected,
    clientSelected,
    paymentMethods,
    listCarts,
    transactionType,
    userData,
  })
    .then((dataTransaction) => {
      const { estado, mensajeEstado, dataResponse } = dataTransaction;
      if (estado) {
        setResponseTransaction(dispatch, dataResponse);
        toast.success(mensajeEstado);
        setIsLoading(dispatch, false);
      } else {
        toast.error(mensajeEstado);
        setIsLoading(dispatch, false);
      }
    })
    .catch((err) => {
      toast.error(err);
      setIsLoading(dispatch, 4);
    });
};

export const empty = () => null;
