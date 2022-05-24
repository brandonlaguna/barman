import PropTypes from "prop-types";
import { LoadingButton } from "@mui/lab";
// import SendIcon from "@mui/icons-material/Send";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { currencyFormat } from "functions/numberFormat";

export default function PaymentButton({ value, onclickTransaction, isLoading }) {
  return (
    <LoadingButton
      onClick={() => onclickTransaction()}
      endIcon={<ArrowForwardIosIcon />}
      loading={isLoading}
      loadingPosition="end"
      variant="contained"
      style={{ width: "100%" }}
      color="success"
    >
      {` Enviar ${currencyFormat(value)}`}
    </LoadingButton>
  );
}

PaymentButton.defaultProps = {
  value: "0",
  isLoading: false,
};

PaymentButton.propTypes = {
  value: PropTypes.string,
  onclickTransaction: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};
