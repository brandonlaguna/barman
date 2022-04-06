import { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import { useMaterialUIController } from "context";
import { useBarCartController } from "context/barCartContext";
import MainModal from "components/MDModales";
// import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { HeaderStyle, ModalStyle } from "./style";

export default function HeaderBarMenu() {
  // context controllers
  const [controllerBar] = useBarCartController();
  const [controller] = useMaterialUIController();
  const { darkMode, sidenavColor } = controller;
  const active = true;
  const [isOpen, setIsOpen] = useState(false);
  const { listTables } = controllerBar;
  const [itemsTables, setItemsTables] = useState([]);

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
          <Grid container spacing={4}>
            {itemsTables.map((table) => (
              <Card>
                <Box>
                  <CardContent>
                    <Typography component="div" variant="h5">
                      {`Mesa #${table.id}`}
                    </Typography>
                  </CardContent>
                </Box>
                <CardMedia
                  component="img"
                  sx={{ width: 100 }}
                  image="https://cdn-icons-png.flaticon.com/512/1209/1209474.png"
                  alt="Live from space album cover"
                />
              </Card>
            ))}
          </Grid>
        </div>
      </MainModal>
    </MDBox>
  );
}

// RenderTables.prototype = {
//   table: PropTypes.instanceOf(Array).isRequired,
//   idx: PropTypes.number.isRequired,
// };
