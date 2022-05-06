import { useState, useEffect } from "react";
import { BANK_ICONS } from "config/contants";
import { Impresora } from "services/printerServices";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// Silpos Barman React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import CircleButton from "components/MDCircleButton";
// Silpos Barman React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
// Data
import printersTableData from "./data/printersTableData";
import ModalConfigPrinter from "./components/ModalConfigPrinter";
import { buttonIconStyle } from "./style";

function Printers() {
  const [isOpenModalPrinter, setIsOpenModalPrinter] = useState(false);
  const [printerList, setPrinterList] = useState([]);
  const { columns, rows } = printersTableData();

  const handleOnForClosePrinter = () => setIsOpenModalPrinter(false);

  const handleSavePrinter = () => {
    console.log("guardado");
    setIsOpenModalPrinter(false);
  };

  const limpiarLista = () => {
    setPrinterList([]);
    // for (let i = $listaDeImpresoras.options.length; i >= 0; i--) {
    //     $listaDeImpresoras.remove(i);
    // }
  };

  const refrescarNombreDeImpresoraSeleccionada = () => {
    Impresora.getImpresora().then((nombreImpresora) => {
      console.log(nombreImpresora);
      // $impresoraSeleccionada.textContent = nombreImpresora;
    });
  };

  const obtenerListaDeImpresoras = () => {
    console.log("Cargando lista...");
    Impresora.getImpresoras().then((listaDeImpresoras) => {
      refrescarNombreDeImpresoraSeleccionada();
      console.log("Lista cargada");
      limpiarLista();
      setPrinterList(listaDeImpresoras);
      // listaDeImpresoras.forEach(nombreImpresora => {
      //     const option = document.createElement('option');
      //     option.value = option.text = nombreImpresora;
      //     $listaDeImpresoras.appendChild(option);
      // })
    });
  };

  // const establecerImpresoraComoPredeterminada = nombreImpresora => {
  //   console.log("Estableciendo impresora...");
  //   Impresora.setImpresora(nombreImpresora)
  //       .then(respuesta => {
  //           refrescarNombreDeImpresoraSeleccionada();
  //           if (respuesta) {
  //               console.log(`Impresora ${nombreImpresora} establecida correctamente`);
  //           } else {
  //               console.log(`No se pudo establecer la impresora con el nombre ${nombreImpresora}`);
  //           }
  //       });
  // };

  useEffect(() => {
    obtenerListaDeImpresoras();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/** Modals */}
      <ModalConfigPrinter
        isOpen={isOpenModalPrinter}
        handleOnForceClose={handleOnForClosePrinter}
        data={printerList}
        handleSavePrinter={handleSavePrinter}
      />
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
                      Impresoras
                    </MDTypography>
                  </Grid>
                  <Grid item xs={1} style={{ alignContent: "right", justifyContent: "right" }}>
                    <CircleButton
                      iconPath={`${BANK_ICONS}/interface/printer.svg`}
                      sx={{ width: "45px", height: "45px" }}
                      sxIcon={buttonIconStyle}
                      onClick={() => setIsOpenModalPrinter(true)}
                      badgeAlert={false}
                    />
                  </Grid>
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
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Printers;
