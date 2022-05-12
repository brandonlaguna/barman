import { useState, useEffect } from "react";
import { BANK_ICONS } from "config/contants";
import MDBox from "components/MDBox";
import { useMaterialUIController } from "context";
import {
  useBarCartController,
  setTableToCart,
  selectClientToCart,
  setTransactionType,
  setLaunchPrinter,
  setPrintPrinter,
} from "context/barCartContext";
import { getClients } from "model/clientsModel";
import { getPaymentMethods } from "model/paymentMethodsModel";
import { getListTables } from "model/tablesModel";
import importBusyTables from "services/tableServices";
import CircleButton from "components/MDCircleButton";
import ModalTables from "./components/Modals/ModalTables";
import { HeaderStyle, buttonIconStyle } from "./style";
import ModalClient from "./components/Modals/ModalClients";
import ModalPaymentMethods from "./components/Modals/ModalPaymentMethods";
import ModalTypeTransaction from "./components/Modals/ModalTypeTransaction";
import ModalPrint from "./components/Modals/ModalPrint";

export default function HeaderBarMenu() {
  // context controllers
  const [controllerBar, dispatchBar] = useBarCartController();
  const [controller] = useMaterialUIController();
  // context methods
  const { darkMode, sidenavColor } = controller;
  const active = true;
  // states
  // to modal
  const [isOpenModalTables, setIsOpenModalTables] = useState(false);
  const [isOpenModalClients, setIsOpenModalClients] = useState(false);
  const [isOpenModalPayments, setIsOpenModalPayments] = useState(false);
  const [isOpenModalTypeTransaction, setIsOpenModalTypeTransaction] = useState(false);
  const [isOpenModalPrint, setIsOpenModalPrint] = useState(false);

  // to data in modals
  const [itemsTables, setItemsTables] = useState([]);
  const [itemsClient, setItemsClients] = useState([]);
  const [itemsPaymentMethods, setItemsPaymentMethods] = useState([]);
  const [busyTables, setBusyTables] = useState([]);

  // context methods
  const {
    listTables,
    tableSelected,
    clientSelected,
    paymentSelected,
    transactionType,
    launchPrinter,
  } = controllerBar;

  const handleSelectTable = (tableId) => {
    setTableToCart(dispatchBar, tableId);
    setIsOpenModalTables(false);
  };

  const handleSelectClient = (client) => {
    selectClientToCart(dispatchBar, client);
    setIsOpenModalClients(false);
  };

  const handleSelectTransactionType = (typeTransaction) => {
    setIsOpenModalTypeTransaction(false);
    setTransactionType(dispatchBar, typeTransaction);
  };

  const handleSelectPrint = (print) => {
    setPrintPrinter(dispatchBar, print);
    setLaunchPrinter(dispatchBar, false);
  };

  const handleOnForceCloseTables = () => setIsOpenModalTables(false);
  const handleOnForceCloseClient = () => setIsOpenModalClients(false);
  const handleOnForceClosePayment = () => setIsOpenModalPayments(false);
  const handleOnForceCloseTypeTransaction = () => setIsOpenModalTypeTransaction(false);
  const handleOnForceClosePrint = () => setLaunchPrinter(dispatchBar, false);

  useEffect(() => {
    getListTables(listTables).then((resTables) => setItemsTables(resTables));
    getClients().then((resClients) => setItemsClients(resClients));
    getPaymentMethods().then((resPayments) => setItemsPaymentMethods(resPayments));
    importBusyTables().then((result) => setBusyTables(result));
  }, []);

  useEffect(() => {
    setIsOpenModalPrint(launchPrinter);
  }, [launchPrinter]);

  return (
    <MDBox
      mb={1.5}
      sx={(theme) =>
        HeaderStyle(theme, {
          darkMode,
          sidenavColor,
          active,
        })
      }
    >
      <CircleButton
        iconPath={`${BANK_ICONS}/interface/usuario.svg`}
        sx={{ width: "45px", height: "45px" }}
        sxIcon={buttonIconStyle}
        onClick={() => setIsOpenModalClients(true)}
        badgeAlert={clientSelected.id ?? false}
      />
      <CircleButton
        rol="button"
        iconPath={`${BANK_ICONS}/interface/coctel-alt.svg`}
        sx={{ width: "45px", height: "45px" }}
        sxIcon={buttonIconStyle}
        onClick={() => setIsOpenModalTables(true)}
        badgeAlert={tableSelected ?? true}
      />
      <CircleButton
        rol="button"
        iconPath={`${BANK_ICONS}/interface/dollar.svg`}
        sx={{ width: "45px", height: "45px" }}
        sxIcon={buttonIconStyle}
        onClick={() => setIsOpenModalPayments(true)}
        badgeAlert={paymentSelected ?? true}
      />
      <CircleButton
        rol="button"
        iconPath={`${BANK_ICONS}/interface/receipt.svg`}
        sx={{ width: "45px", height: "45px" }}
        sxIcon={buttonIconStyle}
        onClick={() => setIsOpenModalTypeTransaction(true)}
        badgeAlert={transactionType !== false ?? true}
      />
      {/** Modals */}
      <ModalTables
        isOpen={isOpenModalTables}
        handleOnForceClose={handleOnForceCloseTables}
        data={itemsTables}
        handleSelectTable={handleSelectTable}
        busyTables={busyTables}
      />
      <ModalClient
        isOpen={isOpenModalClients}
        handleOnForceClose={handleOnForceCloseClient}
        data={itemsClient}
        handleSelectClient={handleSelectClient}
      />
      <ModalPaymentMethods
        isOpen={isOpenModalPayments}
        handleOnForceClose={handleOnForceClosePayment}
        data={itemsPaymentMethods}
      />
      <ModalTypeTransaction
        isOpen={isOpenModalTypeTransaction}
        handleOnForceClose={handleOnForceCloseTypeTransaction}
        handleSelectTransactionType={handleSelectTransactionType}
      />
      <ModalPrint
        isOpen={isOpenModalPrint}
        handleOnForceClose={handleOnForceClosePrint}
        handleSelectPrint={handleSelectPrint}
      />
    </MDBox>
  );
}
