import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { LoadingButton } from "@mui/lab";
// import SendIcon from "@mui/icons-material/Send";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { currencyFormatter } from "functions/numberFormat";
import { useBarCartController, setTransactionType } from "context/barCartContext";
import { useSelectorController } from "context/selectorContext";
import { sendTransactionAC } from "context/action-creator/TransactionAC";
import { calculateTotal } from "functions/calculateTotal";

export default function PaymentButton({ onclickTransaction, disabled, defaultTypeTransaction }) {
  const [totalTransaction, setTotalTransaction] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [controllerBar, dispatchBar] = useBarCartController();
  const [controllerSelector, dispatchSelector] = useSelectorController();
  const { isLoading, responseTransaction } = controllerSelector;

  const { listCarts, tableSelected, clientSelected, paymentMethods, transactionType } =
    controllerBar;

  useEffect(() => {
    if (responseTransaction.httpStatus === 200) {
      onclickTransaction(responseTransaction);
    }
  }, [responseTransaction]);

  useEffect(() => {
    setTotalTransaction(calculateTotal(listCarts));
  }, [listCarts]);

  const handleSentTransaction = () => {
    if (defaultTypeTransaction != null) {
      setTransactionType(dispatchBar, defaultTypeTransaction);
    }
    sendTransactionAC(dispatchSelector, {
      listCarts,
      tableSelected,
      clientSelected,
      paymentMethods,
      transactionType: defaultTypeTransaction != null ? defaultTypeTransaction : transactionType,
    });
  };

  return (
    <LoadingButton
      onClick={() => handleSentTransaction()}
      endIcon={<ArrowForwardIosIcon />}
      loading={isLoading}
      loadingPosition="end"
      variant="contained"
      style={{ width: "100%" }}
      color="success"
      disabled={disabled}
    >
      {` Enviar ${currencyFormatter({
        currency: "COP",
        value: totalTransaction ? totalTransaction.total : 0,
      })}`}
    </LoadingButton>
  );
}

PaymentButton.defaultProps = {
  disabled: false,
  onclickTransaction: () => null,
  defaultTypeTransaction: null,
};

PaymentButton.propTypes = {
  onclickTransaction: PropTypes.func,
  // isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  defaultTypeTransaction: PropTypes.instanceOf(Array),
};
