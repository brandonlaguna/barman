import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for MDInput
import LoaderRoot from "./LoaderRoot";
import { Modal, Box, Typography } from "@mui/material";

const Loader = forwardRef(({ error, success, disabled, ...rest }, ref) => (
  <LoaderRoot {...rest} ref={ref} ownerState={{ error, success, disabled }}>
    <Modal aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box>
    </Modal>
  </LoaderRoot>
));

// Setting default values for the props of Loader
Loader.defaultProps = {
  error: false,
  success: false,
  disabled: false,
};

// Typechecking props for the Loader
Loader.propTypes = {
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Loader;
