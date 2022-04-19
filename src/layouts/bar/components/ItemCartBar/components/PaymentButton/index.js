import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { LoadingButton } from "@mui/lab";
// import SendIcon from "@mui/icons-material/Send";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function PaymentButton({ value }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(value);
  }, []);

  return (
    <LoadingButton
      onClick={() => setLoading(true)}
      endIcon={<ArrowForwardIosIcon />}
      loading={loading}
      loadingPosition="end"
      variant="contained"
      style={{ width: "100%" }}
      color="success"
    >
      Enviar
    </LoadingButton>
  );
}

PaymentButton.defaultProps = {
  value: "0",
};

PaymentButton.propTypes = {
  value: PropTypes.string,
};
