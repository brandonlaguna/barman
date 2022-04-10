import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
// Silpos Barman React components
import MDBox from "components/MDBox";
// Silpos Barman React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Alertas
import { ToastContainer, toast } from "react-toastify";

// Consumir servicios API
import { importItems } from "services/itemsServices";
import { importClientes } from "services/clientsServices";
import { importCategorias } from "services/categoriasServices";
import { importComprobantes } from "services/comprobantesServices";
import { importConfiguracion } from "services/configuracionServices";
import { importTipoTransacciones } from "services/tipoTransaccion.services";
import { importMetodosPago } from "services/metodosPago.services";

function SyncServer() {
  const [statusSync, setStatusSyc] = useState("Conectando con el servidor");
  const [data, setData] = useState("Recopilando informacion");

  const notify = (message) => {
    toast(message, {
      type: "error",
      position: "bottom-right",
    });
  };

  const getMetodosPago = () => {
    importMetodosPago()
      .then((result) => {
        localStorage.setItem("metodosPago", JSON.stringify(result.data));
        setStatusSyc("Obteniento metodos de pago");
        setData(`${Object.keys(result.data).length.toString()} Metodos de pago obtenidos`);
      })
      .catch(notify);
  };

  const getTipoTransacciones = () => {
    importTipoTransacciones()
      .then((result) => {
        localStorage.setItem("tipoTransacciones", JSON.stringify(result.data));
        setStatusSyc("Obteniento tipos de transacciones");
        setData(`${Object.keys(result.data).length.toString()} Tipos de transacciones obtenidas`);
        getMetodosPago();
      })
      .catch(notify);
  };

  const getConfiguracion = () => {
    importConfiguracion()
      .then((result) => {
        localStorage.setItem("configuracion", JSON.stringify(result));
        setStatusSyc("Obteniendo configuracion");
        setData(`${Object.keys(result).length.toString()} Configuraciones obtenidas`);
        getTipoTransacciones();
      })
      .catch(notify);
  };

  const getComprobantes = () => {
    importComprobantes()
      .then((result) => {
        localStorage.setItem("comprobantes", JSON.stringify(result));
        setStatusSyc("Obteniendo comprobantes");
        setData(`${Object.keys(result).length.toString()} Comprobantes obtenidos`);
        getConfiguracion();
      })
      .catch(notify);
  };

  const getCategorias = () => {
    importCategorias()
      .then((result) => {
        localStorage.setItem("categorias", JSON.stringify(result));
        setStatusSyc("Obteniendo categorias");
        setData(`${Object.keys(result.data).length.toString()} Categorias obtenidas`);
        getComprobantes();
      })
      .catch(notify);
  };

  const getClients = () => {
    importClientes()
      .then((result) => {
        localStorage.setItem("clientes", JSON.stringify(result));
        setStatusSyc("Obteniendo clientes");
        setData(`${Object.keys(result.data).length.toString()} Clientes obtenidos`);
        getCategorias();
      })
      .catch(notify);
  };

  const getItems = () => {
    importItems()
      .then((result) => {
        localStorage.setItem("items", JSON.stringify(result));
        setStatusSyc("Obteniendo articulos");
        setData(`${Object.keys(result.data).length.toString()} Articulos obtenidas`);
        getClients();
      })
      .catch(notify);
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <MDBox mb={1.5} />
            <h1>Sincronizando servicios</h1>
            <h2>Estado: {statusSync}.</h2>
            <h3>{data}</h3>
          </Grid>
        </Grid>
        <ToastContainer />
      </MDBox>
    </DashboardLayout>
  );
}

export default SyncServer;
