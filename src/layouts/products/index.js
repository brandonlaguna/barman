import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useProductController } from "context/productContext";
import { getProductsAC, deleteProductAC } from "context/action-creator/productsAC";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";

// import modals
import ModalItem from "./components/modals/ModalItem";
import ModalDeleteItem from "./components/modals/ModalDeleteItem";

export default function Products() {
  const [rows, setRows] = useState([]);
  const [openModalItem, setOpenModalItem] = useState(false);
  const [openModalEditItem, setOpenModalEditItem] = useState(false);
  const [dataItemSelected, setDataItemSelected] = useState(null);
  const [openDeleteModalItem, setOpenDeleteModalItem] = useState(false);
  const [productController, productDispatch] = useProductController();
  const { products, isLoadingProducts } = productController;

  const columns = [
    { Header: "ID", accessor: "id", width: "5%", align: "left" },
    { Header: "Articulo", accessor: "articulo", width: "45%", align: "left" },
    { Header: "Barras", accessor: "barras", align: "left" },
    { Header: "Precio Costo", accessor: "precio_costo", align: "right" },
    { Header: "Precio Venta uno", accessor: "precio_venta", align: "right" },
    { Header: "Total", accessor: "total", align: "center" },
  ];

  const handleRowSelected = (dataSelected) => {
    if (dataSelected) {
      const itemFound = rows.find((itemRow) => itemRow.id === dataSelected.id);
      setDataItemSelected(itemFound);
    } else {
      setDataItemSelected(null);
    }
  };

  const handleOnDeleteItem = () => {
    if (dataItemSelected && dataItemSelected?.id) {
      deleteProductAC(productDispatch, { id: dataItemSelected?.id });
    }
  };

  const handleOnNewItem = (val) => {
    setOpenModalEditItem(false);
    console.log("limpiar");
    // setDataItemSelected(null);
    setOpenModalItem(val);
  };

  const buttons = [
    {
      name: "Nuevo",
      onClick: () => handleOnNewItem(true),
      inheritDisable: false,
      iconButton: <AddIcon />,
      color: "success",
    },
    {
      name: "Editar",
      onClick: () => setOpenModalEditItem(true),
      inheritDisable: true,
      iconButton: <ModeEditOutlineIcon />,
      color: "warning",
    },
    {
      name: "Eliminar",
      onClick: () => setOpenDeleteModalItem(true),
      inheritDisable: true,
      iconButton: <DeleteOutlineIcon />,
      color: "error",
    },
  ];

  useEffect(() => {
    getProductsAC(productDispatch);
  }, []);

  useEffect(() => {
    if (products) {
      setRows(products);
    }
  }, [products]);

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
                  isSorted
                  entriesPerPage
                  noEndBorder
                  canSearch
                  pagination={{
                    variant: "gradient",
                  }}
                  selectRow={handleRowSelected}
                  buttons={buttons}
                  isLoading={isLoadingProducts}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <ModalItem
        isOpen={openModalItem || openModalEditItem}
        handleOnForceClose={() =>
          openModalItem ? setOpenModalItem(false) : setOpenModalEditItem(false)
        }
        data={openModalEditItem ? dataItemSelected : null}
        handleOnSubmit={() => {
          setDataItemSelected(null);
          getProductsAC(productDispatch);
        }}
      />
      <ModalDeleteItem
        isOpen={openDeleteModalItem}
        handleOnForceClose={() => setOpenDeleteModalItem(false)}
        data={dataItemSelected}
        onSuccess={() => handleOnDeleteItem()}
        onCancel={() => setOpenDeleteModalItem(false)}
      />
    </DashboardLayout>
  );
}
