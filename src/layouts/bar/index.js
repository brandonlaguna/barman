import { useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useMaterialUIController, setMiniSidenav } from "context";

// Design
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
// import Context for Bar Cart
import { BarCartControllerProvider } from "context/barCartContext";
// Bar compoents
import HeaderBarMenu from "./components/HeaderBarMenu";
import ItemCartBar from "./components/ItemCartBar";
import ItemsBar from "./components/ItemsBar";

function Bar() {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav } = controller;

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);

  useEffect(() => {
    handleMiniSidenav();
  }, []);

  return (
    <BarCartControllerProvider>
      <DashboardLayout>
        <MDBox py={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <HeaderBarMenu />
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <ItemCartBar />
            </Grid>
            <Grid item xs={12} md={9} lg={9}>
              <MDBox mb={1.5} sx={{ height: "300px" }}>
                <ItemsBar />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </DashboardLayout>
    </BarCartControllerProvider>
  );
}

export default Bar;
