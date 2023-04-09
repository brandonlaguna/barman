import { setPrinters, setLoadingPrinters, setEditPrinter } from "context/printersContext";
import { toast } from "react-toastify";
import {
  importPrinterConfiguracion,
  updatePrinter,
  savePrinter,
  deletePrinter,
} from "services/configuracionServices";

export const getPrintersAC = (dispatch) => {
  setLoadingPrinters(dispatch, 2);
  importPrinterConfiguracion()
    .then((res) => {
      setPrinters(dispatch, res.data);
      localStorage.setItem("printersConfig", JSON.stringify(res.data));
      setLoadingPrinters(dispatch, 3);
    })
    .catch((err) => {
      toast.error(err);
      setLoadingPrinters(dispatch, 4);
    });
};

export const loadPrintersAC = (dispatch) => {
  const categories = localStorage.getItem("printersConfig");
  if (categories != null) {
    setPrinters(dispatch, JSON.parse(categories));
  }
};

export const createPrinterAC = (dispatch, params, countEdit) => {
  setLoadingPrinters(dispatch, 2);
  savePrinter(params)
    .then((res) => {
      const { data: resData } = res;
      if (res.status === 200) {
        setLoadingPrinters(dispatch, 3);
        setEditPrinter(dispatch, countEdit);
        toast.success(resData.message);
      } else {
        setLoadingPrinters(dispatch, 4);
        toast.error(resData.sqlMessage);
      }
    })
    .catch((err) => {
      toast.error(err);
      setLoadingPrinters(dispatch, 4);
    });
};

export const updatePrinterAC = (dispatch, params, countEdit) => {
  setLoadingPrinters(dispatch, 2);
  updatePrinter(params)
    .then((res) => {
      const { data: resData } = res;
      if (res.status === 200) {
        setLoadingPrinters(dispatch, 3);
        setEditPrinter(dispatch, countEdit);
        toast.success(resData.message);
      } else {
        setLoadingPrinters(dispatch, 4);
        toast.error(resData.message);
      }
    })
    .catch((err) => {
      toast.error(err);
      setLoadingPrinters(dispatch, 4);
    });
};

export const deletePrinterAC = (dispatch, params, countEdit) => {
  setLoadingPrinters(dispatch, 2);
  deletePrinter(params)
    .then((res) => {
      const { data: resData } = res;
      console.log(res);
      if (res.status === 200) {
        setLoadingPrinters(dispatch, 3);
        setEditPrinter(dispatch, countEdit);
        toast.success(resData.message);
      } else {
        setLoadingPrinters(dispatch, 4);
        toast.error(resData.message);
      }
    })
    .catch((err) => {
      toast.error(err);
      setLoadingPrinters(dispatch, 4);
    });
};

export const addClientAC = () => true;
