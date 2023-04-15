import { useState, useEffect } from "react";
import { Impresora } from "services/printerServices";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// Silpos Barman React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// Silpos Barman React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
// Data
import { usePrintersController } from "context/printersContext";
import { getPrintersAC, deletePrinterAC } from "context/action-creator/printersAC";
import printersTableData from "./data/printersTableData";
import ModalConfigPrinter from "./components/ModalConfigPrinter";
import ModalDeletePrinter from "./components/ModalDeletePrinter";

function Printers() {
  const [isOpenModalPrinter, setIsOpenModalPrinter] = useState(false);
  const [openDeletePrinter, setOpenDeletePrinter] = useState(false);
  const [printerList, setPrinterList] = useState([]);
  const [rows, setRows] = useState([]);
  const [dataItemSelected, setDataItemSelected] = useState(null);
  const [printersController, printerDispatch] = usePrintersController();
  const { printers, isLoadingPrinters, isEdited } = printersController;

  const columns = [
    { Header: "ID", accessor: "id", width: "5%", align: "left" },
    { Header: "Nombre", accessor: "printer", width: "45%", align: "left" },
    { Header: "Tipo", accessor: "function", align: "left" },
    { Header: "Estado", accessor: "status", align: "center" },
    { Header: "Ruta", accessor: "route", align: "center" },
  ];

  const buttons = [
    {
      name: "Nuevo",
      onClick: () => setIsOpenModalPrinter(true),
      inheritDisable: false,
      iconButton: <AddIcon />,
      color: "success",
    },
    {
      name: "Editar",
      onClick: () => setIsOpenModalPrinter(true),
      inheritDisable: true,
      iconButton: <ModeEditOutlineIcon />,
      color: "warning",
    },
    {
      name: "Eliminar",
      onClick: () => setOpenDeletePrinter(true),
      inheritDisable: true,
      iconButton: <DeleteOutlineIcon />,
      color: "error",
    },
  ];

  const handleRowSelected = (dataSelected) => {
    if (dataSelected) {
      const itemFound = printers.find((itemRow) => itemRow.id === dataSelected.id);
      setDataItemSelected(itemFound);
    } else {
      setDataItemSelected(null);
    }
  };

  const handleOnForClosePrinter = () => setIsOpenModalPrinter(false);

  const handleSavePrinter = () => {
    getPrintersAC(printerDispatch);
  };

  const limpiarLista = () => {
    setPrinterList([]);
  };

  const refrescarNombreDeImpresoraSeleccionada = () => {
    Impresora.getImpresora().then(() => null);
  };

  const obtenerListaDeImpresoras = () => {
    Impresora.getImpresoras().then((listaDeImpresoras) => {
      refrescarNombreDeImpresoraSeleccionada();
      limpiarLista();
      setPrinterList(listaDeImpresoras);
    });
  };

  const handleOnDeleteItem = () => {
    if (dataItemSelected && dataItemSelected?.id) {
      deletePrinterAC(printerDispatch, { id: dataItemSelected?.id }, isEdited + 1);
    }
  };

  useEffect(() => {
    getPrintersAC(printerDispatch);
    obtenerListaDeImpresoras();
  }, []);

  useEffect(() => {
    if (printers) {
      printersTableData(printers).then((result) => setRows(result));
    }
  }, [printers]);

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
                      Impresoras
                    </MDTypography>
                  </Grid>
                </Grid>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted
                  entriesPerPage
                  noEndBorder
                  canSearch
                  pagination={{
                    variant: "gradient",
                  }}
                  selectRow={handleRowSelected}
                  buttons={buttons}
                  isLoading={isLoadingPrinters}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {/** Modals */}
      <ModalConfigPrinter
        isOpen={isOpenModalPrinter}
        handleOnForceClose={handleOnForClosePrinter}
        printerList={printerList}
        handleSavePrinter={handleSavePrinter}
        data={dataItemSelected}
      />
      <ModalDeletePrinter
        isOpen={openDeletePrinter}
        handleOnForceClose={() => setOpenDeletePrinter(false)}
        data={dataItemSelected}
        onSuccess={() => handleOnDeleteItem()}
        onCancel={() => setOpenDeletePrinter(false)}
      />
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Printers;
