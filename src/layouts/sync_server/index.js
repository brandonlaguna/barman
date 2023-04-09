import { useEffect } from "react";
import Grid from "@mui/material/Grid";
// Silpos Barman React components
import MDBox from "components/MDBox";
// Silpos Barman React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import {
  getProductsAC,
  getCategoriesAC,
  getParametersAC,
  getLocationsAC,
} from "context/action-creator/productsAC";
import { useProductController } from "context/productContext";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
// import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
// import Avatar from "@mui/material/Avatar";
import StatusIcon from "components/MDStatusIcon";
import { useClientsController } from "context/clientsContext";
import { getClientsAC } from "context/action-creator/clientsAC";
import { usePrintersController } from "context/printersContext";
import { getPrintersAC } from "context/action-creator/printersAC";
import { useSelectorController } from "context/selectorContext";
import {
  getMetodosPagoAC,
  getTiposTransaccionesAC,
  getAdministradorAC,
  getComprobantesAC,
} from "context/action-creator/selectorAC";

function SyncServer() {
  const [productController, productDispatch] = useProductController();
  const [clientsController, clientDispatch] = useClientsController();
  const [printersController, printerDispatch] = usePrintersController();
  const [controllerSelector, dispatchSelector] = useSelectorController();
  const { isLoadingProducts, isLoadingCategories, isLoadingParameters, isLoadingLocations } =
    productController;
  const { isLoadingClients } = clientsController;
  const { isLoadingPrinters } = printersController;
  const {
    isLoadingMetodosPago,
    isLoadingTiposTransacciones,
    isLoadingAdministrador,
    isLoadingComprobantes,
  } = controllerSelector;

  useEffect(() => {
    getCategoriesAC(productDispatch);
    getClientsAC(clientDispatch);
    getTiposTransaccionesAC(dispatchSelector);
    getPrintersAC(printerDispatch);
    getMetodosPagoAC(dispatchSelector);
    getProductsAC(productDispatch);
    getComprobantesAC(dispatchSelector);
    getAdministradorAC(dispatchSelector);
    getParametersAC(productDispatch);
    getLocationsAC(productDispatch);
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <MDBox mb={1.5} />
            <List dense sx={{ width: "100%", maxWidth: 360 }}>
              <ListItem>
                <ListItemIcon>
                  <StatusIcon status={isLoadingProducts} />
                </ListItemIcon>
                <ListItemText primary="Productos" />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <StatusIcon status={isLoadingCategories} />
                </ListItemIcon>
                <ListItemText primary="Categorias" />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <StatusIcon status={isLoadingClients} />
                </ListItemIcon>
                <ListItemText primary="Clientes" />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <StatusIcon status={isLoadingPrinters} />
                </ListItemIcon>
                <ListItemText primary="Impresoras" />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <StatusIcon status={isLoadingMetodosPago} />
                </ListItemIcon>
                <ListItemText primary="Metodos de pago" />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <StatusIcon status={isLoadingTiposTransacciones} />
                </ListItemIcon>
                <ListItemText primary="Tipos de transacciones" />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <StatusIcon status={isLoadingAdministrador} />
                </ListItemIcon>
                <ListItemText primary="Configuracion de la empresa" />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <StatusIcon status={isLoadingComprobantes} />
                </ListItemIcon>
                <ListItemText primary="Comprobantes" />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <StatusIcon status={isLoadingParameters} />
                </ListItemIcon>
                <ListItemText primary="Parametros de productos" />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <StatusIcon status={isLoadingLocations} />
                </ListItemIcon>
                <ListItemText primary="Ubicacion de productos" />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default SyncServer;
