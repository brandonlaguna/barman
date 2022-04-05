import { useState } from "react";
import MDBox from "components/MDBox";
import { useMaterialUIController } from "context";
import { useBarCartController } from "context/barCartContext";
import MainModal from "components/MDModales";
import Button from "@mui/material/Button";
import FlatList from "flatlist-react";
// importtypes PropTypes from "prop-types";
import { HeaderStyle, ModalStyle } from "./style";

function RenderTables(table, idx) {
  const { id, status } = table;
  return (
    <div key={idx}>
      <b>
        {id} {status}
      </b>
    </div>
  );
}

export default function HeaderBarMenu() {
  // context controllers
  const [controllerBar] = useBarCartController();
  const [controller] = useMaterialUIController();
  const { darkMode, sidenavColor } = controller;
  const active = true;
  const [isOpen, setIsOpen] = useState(false);
  const { listTables } = controllerBar;

  // const selectTable = (id) => setTableToCart(dispatchBar, id);

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
      <Button onClick={() => setIsOpen(true)}>Open modal</Button>
      <MainModal
        isOpen={isOpen}
        modalStyle={(theme) =>
          ModalStyle(theme, {
            darkMode,
            sidenavColor,
            active,
          })
        }
      >
        <div style={{ width: "100%" }}>
          <FlatList
            list={loadListTables}
            renderItem={RenderTables}
            renderWhenEmpty={() => <div>List is empty!</div>}
            sortBy={["id", { key: "status", descending: false }]}
          />
        </div>
      </MainModal>
    </MDBox>
  );
}
