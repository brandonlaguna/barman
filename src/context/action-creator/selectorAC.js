import {
  setMetodosPago,
  setIsLoadingMetodosPago,
  setTiposTransacciones,
  setIsLoadingTiposTransacciones,
  setAdministrador,
  setIsLoadingAdministrador,
  setComprobantes,
  setIsLoadingComprobantes,
} from "context/selectorContext";
import { toast } from "react-toastify";
import { importComprobantes } from "services/comprobantesServices";
import { importConfiguracion } from "services/configuracionServices";
import { importMetodosPago } from "services/metodosPago.services";
import { importTipoTransacciones } from "services/tipoTransaccion.services";

export const getMetodosPagoAC = (dispatch) => {
  setIsLoadingMetodosPago(dispatch, 2);
  importMetodosPago()
    .then((res) => {
      setMetodosPago(dispatch, res.data);
      localStorage.setItem("metodosPago", JSON.stringify(res.data));
      setIsLoadingMetodosPago(dispatch, 3);
    })
    .catch((err) => {
      toast.error(err);
      setIsLoadingMetodosPago(dispatch, 4);
    });
};

export const getTiposTransaccionesAC = (dispatch) => {
  setIsLoadingTiposTransacciones(dispatch, 2);
  importTipoTransacciones()
    .then((res) => {
      setTiposTransacciones(dispatch, res.data);
      localStorage.setItem("tipoTransacciones", JSON.stringify(res.data));
      setIsLoadingTiposTransacciones(dispatch, 3);
    })
    .catch((err) => {
      toast.error(err);
      setIsLoadingTiposTransacciones(dispatch, 4);
    });
};

export const getAdministradorAC = (dispatch) => {
  setIsLoadingAdministrador(dispatch, 2);
  importConfiguracion()
    .then((res) => {
      setAdministrador(dispatch, res);
      localStorage.setItem("configuracion", JSON.stringify(res));
      setIsLoadingAdministrador(dispatch, 3);
    })
    .catch((err) => {
      toast.error(err);
      setIsLoadingAdministrador(dispatch, 4);
    });
};

export const getComprobantesAC = (dispatch) => {
  setIsLoadingComprobantes(dispatch, 2);
  importComprobantes()
    .then((res) => {
      setComprobantes(dispatch, res);
      localStorage.setItem("comprobantes", JSON.stringify(res));
      setIsLoadingComprobantes(dispatch, 3);
    })
    .catch((err) => {
      toast.error(err);
      setIsLoadingComprobantes(dispatch, 4);
    });
};
