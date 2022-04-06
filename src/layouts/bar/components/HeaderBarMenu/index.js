import { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import { useMaterialUIController } from "context";
import { useBarCartController, setTableToCart } from "context/barCartContext";
import MainModal from "components/MDModales";
// import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TablesCard from "./components/TablesCard";
import { HeaderStyle, ModalStyle } from "./style";

export default function HeaderBarMenu() {
  // context controllers
  const [controllerBar, dispatchBar] = useBarCartController();
  const [controller] = useMaterialUIController();
  // context methods
  const { darkMode, sidenavColor } = controller;
  const active = true;
  // states
  const [isOpen, setIsOpen] = useState(false);
  const { listTables, tableSelected } = controllerBar;
  const [itemsTables, setItemsTables] = useState([]);
  // context methods
  const handleSelectTable = (tableId) => {
    setTableToCart(dispatchBar, tableId);
    setIsOpen(false);
  };

  const handleOnForceClose = () => setIsOpen(false);

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
  }, []);

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
      <Button onClick={() => setIsOpen(true)} style={{ color: "white" }}>
        {`Mesas ${tableSelected ? `#${tableSelected}` : ""}`}
      </Button>
      <MainModal
        isOpen={isOpen}
        onForceClose={handleOnForceClose}
        modalStyle={(theme) =>
          ModalStyle(theme, {
            darkMode,
            sidenavColor,
            active,
            scrollY: "scroll",
          })
        }
      >
        <Grid container spacing={1} style={{ overflowY: "scroll", height: "100%" }}>
          {itemsTables.map((table) => (
            <TablesCard data={table} onClickTable={handleSelectTable} />
          ))}
        </Grid>
      </MainModal>
    </MDBox>
  );
}
