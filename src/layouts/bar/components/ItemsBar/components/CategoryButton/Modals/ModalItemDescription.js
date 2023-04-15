import { useState, useEffect } from "react";
import { useMaterialUIController } from "context";
import MainModal from "components/MDModales";
import { ModalItemDescriptionStyle } from "../../../style";

const ModalItemDescription = ({ isOpen, handleOnForceClose, data}) => {
  const [controller] = useMaterialUIController();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { darkMode, sidenavColor } = controller;
  const active = true;

  useEffect(() => {
    setIsOpenModal(isOpen);
  }, [isOpen]);

  return (
    <MainModal
      key={2}
      isOpen={isOpenModal}
      onForceClose={handleOnForceClose}
      modalStyle={(theme) =>
        ModalItemDescriptionStyle(theme, {
          darkMode,
          sidenavColor,
          active,
          scrollY: "scroll",
        })
      }
    ></MainModal>
  );
}

export default ModalItemDescription;
