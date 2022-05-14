import { useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
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
import CategoryButton from "./components/ItemsBar/components/CategoryButton";

function Bar() {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav } = controller;

  const handleMiniSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    handleMiniSidenav();
  }, [miniSidenav]);

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
            <Grid item xs={12} md={8} lg={8}>
              <MDBox mb={1.5} sx={{ height: "300px" }}>
                <ItemsBar />
              </MDBox>
            </Grid>
            <Grid item xs={1} md={1} lg={1}>
              <CategoryButton />
            </Grid>
          </Grid>
        </MDBox>
      </DashboardLayout>
    </BarCartControllerProvider>
  );
}

export default Bar;
