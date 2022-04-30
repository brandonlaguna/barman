import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useMaterialUIController } from "context";
import PropTypes from "prop-types";
import MainModal from "components/MDModales";
import transactionTypeModel from "model/TransactionTypeModel";
import { ModalTypeTransactionStyle } from "../../style";
import CardTypeTransaction from "../CardTypeTransaction";

export default function ModalTypeTransaction({
  isOpen,
  handleOnForceClose,
  handleSelectTypeTransaction,
}) {
  const [listTypeTransaction, setListTypeTransaction] = useState([]);
  const [controller] = useMaterialUIController();
  // context methods
  const { darkMode, sidenavColor } = controller;
  const active = true;

  useEffect(() => {
    transactionTypeModel().then((types) => setListTypeTransaction(types));
  }, []);

  return (
    <MainModal
      key={2}
      isOpen={isOpen}
      onForceClose={handleOnForceClose}
      modalStyle={(theme) =>
        ModalTypeTransactionStyle(theme, {
          darkMode,
          sidenavColor,
          active,
          scrollY: "scroll",
        })
      }
    >
      <Grid
        container
        spacing={1}
        style={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          padding: 6,
          marginLeft: -2,
        }}
      >
        {listTypeTransaction.map((transactionType) => (
          <CardTypeTransaction
            key={transactionType.id}
            data={transactionType}
            onClickTypeTransaction={handleSelectTypeTransaction}
          />
        ))}
      </Grid>
    </MainModal>
  );
}

ModalTypeTransaction.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleOnForceClose: PropTypes.func.isRequired,
  handleSelectTypeTransaction: PropTypes.func.isRequired,
};
