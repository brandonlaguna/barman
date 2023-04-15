import { useState, useEffect } from "react";
import { BANK_ICONS } from "config/contants";
import MDBox from "components/MDBox";
import { useMaterialUIController } from "context";
import {
  useBarCartController,
  setTableToCart,
  addItemToCart,
  selectClientToCart,
  setTransactionType,
  setLaunchPrinter,
  setPrintPrinter,
  resetItemsCart,
  clean,
} from "context/barCartContext";
import { toast } from "react-toastify";
import { getClients } from "model/clientsModel";
import { getPaymentMethods } from "model/paymentMethodsModel";
import { getListTables } from "model/tablesModel";
import { importBusyTables, changeTable } from "services/tableServices";
import CircleButton from "components/MDCircleButton";
import ModalTables from "./components/Modals/ModalTables";
import { HeaderStyle, buttonIconStyle } from "./style";
import ModalClient from "./components/Modals/ModalClients";
import ModalPaymentMethods from "./components/Modals/ModalPaymentMethods";
import ModalTypeTransaction from "./components/Modals/ModalTypeTransaction";
import ModalPrint from "./components/Modals/ModalPrint";
import ModalChange from "./components/Modals/ModalChange";

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
  const [isOpenModalChange, setIsOpenModalChange] = useState(false);
  const [isChangeTable, setIsChangeTable] = useState(false);
  const [oldChangeTable, setOldChangeTable] = useState(0);

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

  const insertTablesToCard = (tableData) => {
    if (tableData.length > 0) {
      resetItemsCart(dispatchBar, []);
      tableData.forEach((item) => {
        addItemToCart(dispatchBar, {
          ...item,
          id: Number.parseInt(item.interno, 10),
          articulo: item.producto,
          puesto: Number.parseInt(item.puesto, 10),
        });
      });
    }
  };

  const handleSelectTable = (tableId, tableData) => {
    if (isChangeTable) {
      changeTable({
        oldpuesto: oldChangeTable,
        newpuesto: tableId,
      }).then(() => {
        // resetItemsCart(dispatchBar, []);
        setTableToCart(dispatchBar, tableId);
        setIsChangeTable(false);
        setIsOpenModalTables(false);
      });
    } else {
      setTableToCart(dispatchBar, tableId);
      resetItemsCart(dispatchBar, []);
      setIsOpenModalTables(false);
      insertTablesToCard(tableData);
    }
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
    if (!print) {
      clean(dispatchBar);
    }
  };

  const handleHoldTable = () => {
    if (!tableSelected) {
      toast.warn("No hay mesas seleccionadas para ésta accion.");
    } else {
      setOldChangeTable(tableSelected);
      setIsOpenModalTables(true);
      setIsChangeTable(true);
    }
    return true;
  };

  const handleOnForceCloseTables = () => setIsOpenModalTables(false);
  const handleOnForceCloseClient = () => setIsOpenModalClients(false);
  const handleOnForceClosePayment = () => setIsOpenModalPayments(false);
  const handleOnForceCloseTypeTransaction = () => setIsOpenModalTypeTransaction(false);
  const handleOnForceClosePrint = () => setLaunchPrinter(dispatchBar, false);
  const handleOnForceCloseChange = () => setIsOpenModalChange(false);

  const initBusyTables = () => {
    importBusyTables().then((result) => {
      setBusyTables(result);
      setIsOpenModalTables(true);
      setIsChangeTable(false);
      setOldChangeTable(0);
    });
  };

  const loadClients = () => {
    getClients().then((resClients) => {
      setItemsClients(resClients);
    });
  };

  useEffect(() => {
    getListTables(listTables).then((resTables) => setItemsTables(resTables));
    getClients().then((resClients) => setItemsClients(resClients));
    loadClients();
    getPaymentMethods().then((resPayments) => setItemsPaymentMethods(resPayments));
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
        onClick={() => initBusyTables()}
        badgeAlert={tableSelected ?? true}
        onHold={() => handleHoldTable()}
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
        isChangeTable={isChangeTable}
      />
      <ModalClient
        isOpen={isOpenModalClients}
        handleOnForceClose={handleOnForceCloseClient}
        data={itemsClient}
        handleSelectClient={handleSelectClient}
        handleForceReload={(val) => loadClients(val)}
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
      <ModalChange
        isOpen={isOpenModalChange}
        handleOnForceClose={handleOnForceCloseChange}
        data={[]}
      />
    </MDBox>
  );
}
