import { useState, useEffect } from "react";
import { useMaterialUIController } from "context";
import { toast } from "react-toastify";
import { saveClient, importClientes } from "services/clientsServices";
import SearchBar from "components/MDSearchBar";
import MainModal from "components/MDModales";
import { Grid, Button, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ClientForm from "components/Forms/ClientForm";
import PropTypes from "prop-types";
import CardClient from "../CardClient";
import { ModalClientStyle } from "../../style";

function AddClientButton({ onClickAddClient }) {
  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <Button variant="outlined" style={{ color: "black" }} onClick={() => onClickAddClient(true)}>
        Agregar cliente
      </Button>
    </div>
  );
}

export default function ModalClient({ isOpen, handleOnForceClose, data, handleSelectClient }) {
  const [controller] = useMaterialUIController();
  const [filteredDataSource, setFilteredDataSource] = useState(data);
  const [filterQuantity, setFilterQuantity] = useState(data.length);
  const [showForm, setShowForm] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [clearForm, setClearForm] = useState(false);

  // context methods
  const { darkMode, sidenavColor } = controller;
  const active = true;

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = data.filter((item) => {
        const itemData = `${item.nombres.toLowerCase()} ${item.documento.toLowerCase()} ${item.razon_social.toLowerCase()} ${item.telefonos.toLowerCase()} ${item.observaciones.toLowerCase()} ${item.direccion.toLowerCase()}`;
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterQuantity(newData.length);
      setFilteredDataSource(newData);
    } else {
      setFilteredDataSource(data);
    }
  };

  const onClickClient = (client) => handleSelectClient(client);

  const handleSearchFilter = (text) => searchFilterFunction(text);

  const handleResponseDataClient = (client) => {
    setIsSend(false);
    saveClient(client).then((response) => {
      console.log("respuesta", response);
      if (response.status) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      setClearForm(true);
      setIsSend(true);
    });
  };

  useEffect(() => {
    importClientes().then((result) => {
      console.log("obteniendo clientes");
      localStorage.removeItem("clientes");
      localStorage.setItem("clientes", JSON.stringify(result));
      setShowForm(false);
      setFilteredDataSource(data);
      setFilterQuantity(data.length);
    });
  }, [clearForm]);

  return (
    <MainModal
      key={2}
      isOpen={isOpen}
      onForceClose={handleOnForceClose}
      modalStyle={(theme) =>
        ModalClientStyle(theme, {
          darkMode,
          sidenavColor,
          active,
          scrollY: "scroll",
        })
      }
    >
      <Grid container spacing={1} style={{ overflowY: "scroll", height: "100%", padding: "9px" }}>
        <div style={{ width: "100%" }} hidden={showForm}>
          <SearchBar handleSearch={handleSearchFilter} />
          <CardClient data={filteredDataSource} onClickClient={onClickClient} />
          {filterQuantity === 0 ? <AddClientButton onClickAddClient={setShowForm} /> : null}
        </div>
        <div style={{ width: "100%" }} hidden={!showForm}>
          <IconButton
            color="primary"
            aria-label="Regresar"
            component="span"
            onClick={() => setShowForm(false)}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <ClientForm dataClient={handleResponseDataClient} isSend={isSend} clearForm={clearForm} />
        </div>
      </Grid>
    </MainModal>
  );
}

ModalClient.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleOnForceClose: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(Array).isRequired,
  handleSelectClient: PropTypes.func.isRequired,
};

AddClientButton.propTypes = {
  onClickAddClient: PropTypes.func.isRequired,
};
