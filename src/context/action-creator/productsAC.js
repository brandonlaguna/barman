import {
  setProducts,
  setLoading,
  setIsEdited,
  removeItem,
  setCategories,
  setLoadingCategories,
  setParameters,
  setLoadingParameters,
  setLocations,
  setLoadingLocations,
} from "context/productContext";
import { toast } from "react-toastify";
import { importCategorias } from "services/categoriasServices";
import {
  saveItem,
  importItems,
  updateItem,
  deleteItem,
  importParameters,
  importLocations,
} from "services/itemsServices";

export const getProductsAC = (dispatch) => {
  setLoading(dispatch, 2);
  importItems()
    .then((res) => {
      setProducts(dispatch, res.data);
      localStorage.setItem("items", JSON.stringify(res.data));
      setLoading(dispatch, 3);
    })
    .catch((err) => {
      toast.error(err);
      setLoading(dispatch, 4);
    });
};

export const addProductAC = (dispatch, data) => {
  setLoading(dispatch, 2);
  saveItem(data)
    .then((res) => {
      const { data: resData } = res;
      if (res.status === 200) {
        setLoading(dispatch, 3);
        setIsEdited(dispatch, 1);
        toast.success(resData.message);
      } else {
        setLoading(dispatch, 4);
        toast.error(resData.sqlMessage);
      }
    })
    .catch((err) => toast.error(err));
};

export const updateProductAC = (dispatch, data, countEdit) => {
  setLoading(dispatch, 2);
  updateItem(data)
    .then((res) => {
      const { data: resData } = res;
      if (res.status === 200) {
        setIsEdited(dispatch, countEdit);
        setLoading(dispatch, 3);
        toast.success(resData.message);
      } else {
        toast.error(resData.sqlMessage);
        setLoading(dispatch, 4);
      }
    })
    .catch((err) => toast.error(err))
    .finally(() => setLoading(dispatch, 3));
};

export const deleteProductAC = (dispatch, data) => {
  setLoading(dispatch, 2);
  deleteItem(data)
    .then((res) => {
      const { data: resData } = res;
      if (res.status === 200) {
        removeItem(dispatch, data.id);
        setLoading(dispatch, 3);
        toast.success(resData.message);
      } else {
        setLoading(dispatch, 4);
        toast.error(resData.sqlMessage);
      }
    })
    .catch((err) => toast.error(err));
};

export const getCategoriesAC = (dispatch) => {
  setLoadingCategories(dispatch, 2);
  importCategorias()
    .then((res) => {
      setCategories(dispatch, res.data);
      localStorage.setItem("categorias", JSON.stringify(res.data));
      setLoadingCategories(dispatch, 3);
    })
    .catch((err) => {
      toast.error(err);
      setLoadingCategories(dispatch, 4);
    });
};

export const getParametersAC = (dispatch) => {
  setLoadingParameters(dispatch, 2);
  importParameters()
    .then((res) => {
      setParameters(dispatch, res);
      localStorage.setItem("parameters", JSON.stringify(res));
      setLoadingParameters(dispatch, 3);
    })
    .catch((err) => {
      toast.error(err);
      setLoadingParameters(dispatch, 4);
    });
};

export const loadItemParametrizationAC = (dispatch) => {
  setLoadingParameters(dispatch, 2);
  const parameters = localStorage.getItem("parameters");
  if (parameters != null) {
    setParameters(dispatch, JSON.parse(parameters));
    setLoadingParameters(dispatch, 3);
  }
};

export const loadCategoriasAC = (dispatch) => {
  const categories = localStorage.getItem("categorias");
  if (categories != null) {
    setCategories(dispatch, JSON.parse(categories));
  }
};

export const getLocationsAC = (dispatch) => {
  setLoadingLocations(dispatch, 2);
  importLocations()
    .then((res) => {
      setLocations(dispatch, res);
      localStorage.setItem("ubicacion", JSON.stringify(res));
      setLoadingLocations(dispatch, 3);
    })
    .catch((err) => {
      toast.error(err);
      setLoadingLocations(dispatch, 4);
    });
};

export const loadLocationsAC = (dispatch) => {
  const categories = localStorage.getItem("ubicacion");
  if (categories != null) {
    setLocations(dispatch, JSON.parse(categories));
  }
};
