import { importClientes } from "services/clientsServices";
import { setLoadingClients, setClients } from "context/clientsContext";
import { toast } from "react-toastify";

export const getClientsAC = (dispatch) => {
  setLoadingClients(dispatch, 2);
  importClientes()
    .then((res) => {
      setClients(dispatch, res.data);
      localStorage.setItem("clientes", JSON.stringify(res.data));
      setLoadingClients(dispatch, 3);
    })
    .catch((err) => {
      toast.error(err);
      setLoadingClients(dispatch, 4);
    });
};

export const addClientAC = () => true;
