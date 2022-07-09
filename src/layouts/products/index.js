import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

export default function Products() {
  const [rows, setRows] = useState([]);
  const columns = [
    { Header: "ID", accessor: "id", width: "5%", align: "left" },
    { Header: "Nombre", accessor: "printer", width: "45%", align: "left" },
    { Header: "Tipo", accessor: "function", align: "left" },
    { Header: "Estado", accessor: "status", align: "center" },
    { Header: "Ruta", accessor: "route", align: "center" },
    { Header: "Accion", accessor: "action", align: "center" },
  ];

  useEffect(() => {
    setRows([]);
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <Grid container>
                  <Grid item xs={11}>
                    <MDTypography variant="h6" color="white">
                      Productos
                    </MDTypography>
                  </Grid>
                  <Grid item xs={1} style={{ alignContent: "right", justifyContent: "right" }} />
                </Grid>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}
