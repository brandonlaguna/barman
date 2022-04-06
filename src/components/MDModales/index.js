// import Backdrop from "@mui/material/Backdrop";
import MDBox from "components/MDBox";
import Modal from "@mui/material/Modal";
// import Fade from "@mui/material/Fade";
import PropTypes from "prop-types";

export default function MainModal({ children, isOpen, modalStyle, onForceClose }) {
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onForceClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MDBox mb={1.5} sx={modalStyle}>
          {children}
        </MDBox>
      </Modal>
    </div>
  );
}

MainModal.defaultProps = {
  children: false,
  isOpen: false,
  modalStyle: [],
};

MainModal.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  modalStyle: PropTypes.instanceOf(Array),
  onForceClose: PropTypes.func.isRequired,
};
