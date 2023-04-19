import { importClientes, saveClient } from "services/clientsServices";
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

export const addClientAC = (dispatch, data) => {
  saveClient(data)
    .then((res) => {
      const { data: resData } = res;
      if (res.status === 200) {
        toast.success(resData.message);
      } else {
        toast.error(resData.sqlMessage);
      }
    })
    .catch((err) => toast.error(err));
};
