import PropTypes from "prop-types";
import { LoadingButton } from "@mui/lab";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function SaveButton({ isLoading }) {
  return (
    <LoadingButton
      type="submit"
      endIcon={<ArrowForwardIosIcon />}
      loading={isLoading}
      loadingPosition="end"
      variant="outlined"
      style={{ color: "black" }}
      color="success"
    >
      Guardar Cliente
    </LoadingButton>
  );
}

SaveButton.defaultProps = {
  isLoading: false,
};

SaveButton.propTypes = {
  isLoading: PropTypes.bool,
};
