import { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import { useMaterialUIController } from "context";
import { useBarCartController, setTableToCart, selectClientToCart } from "context/barCartContext";
import { getClients } from "model/clientsModel";
import CircleButton from "components/MDCircleButton";
import ModalTables from "./components/Modals/ModalTables";
import { HeaderStyle } from "./style";
import ModalClient from "./components/Modals/ModalClients";

export default function HeaderBarMenu() {
  // context controllers
  const [controllerBar, dispatchBar] = useBarCartController();
  const [controller] = useMaterialUIController();
  // context methods
  const { darkMode, sidenavColor } = controller;
  const active = true;
  // states
  // for tables modal
  const [isOpenModalTables, setIsOpenModalTables] = useState(false);
  const [isOpenModalClients, setIsOpenModalClients] = useState(false);
  const [itemsTables, setItemsTables] = useState([]);
  const [itemsClient, setItemsClients] = useState([]);

  // context methods
  const { listTables, tableSelected, clientSelected } = controllerBar;

  const handleSelectTable = (tableId) => {
    setTableToCart(dispatchBar, tableId);
    setIsOpenModalTables(false);
  };

  const handleSelectClient = (client) => {
    console.log(`cliente tal seleccionado ${client}`);
    selectClientToCart(dispatchBar, client);
    setIsOpenModalClients(false);
  };

  const handleOnForceCloseTables = () => setIsOpenModalTables(false);
  const handleOnForCloseClient = () => setIsOpenModalClients(false);

  const loadListTables = () => {
    const temporalTables = [];
    for (let index = 1; index <= listTables; index += 1) {
      const thisTable = [];
      thisTable.push({
        id: index,
        status: false,
        mesa: false,
        itemsFromMesa: [],
      });
      temporalTables.push(thisTable[0]);
    }
    return temporalTables;
  };

  useEffect(() => {
    const list = loadListTables();
    setItemsTables(list);
    getClients().then((resClients) => setItemsClients(resClients));
  }, []);

  const buttonIconStyle = {
    width: "20px",
    height: "20px",
    color: "white",
    filter:
      "invert(88%) sepia(21%) saturate(935%) hue-rotate(123deg) brightness(85%) contrast(97%)",
  };

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
        iconPath="../../assets/BankIcon/interface/usuario.svg"
        sx={{ width: "45px", height: "45px" }}
        sxIcon={buttonIconStyle}
        onClick={() => setIsOpenModalClients(true)}
        badgeAlert={clientSelected.id ?? false}
      />
      <CircleButton
        rol="button"
        iconPath="../../assets/BankIcon/interface/coctel-alt.svg"
        sx={{ width: "45px", height: "45px" }}
        sxIcon={buttonIconStyle}
        onClick={() => setIsOpenModalTables(true)}
        badgeAlert={tableSelected ?? true}
      />
      {/** Modals */}
      <ModalTables
        isOpen={isOpenModalTables}
        handleOnForceClose={handleOnForceCloseTables}
        data={itemsTables}
        handleSelectTable={handleSelectTable}
      />
      <ModalClient
        isOpen={isOpenModalClients}
        handleOnForceClose={handleOnForCloseClient}
        data={itemsClient}
        handleSelectClient={handleSelectClient}
      />
    </MDBox>
  );
}
