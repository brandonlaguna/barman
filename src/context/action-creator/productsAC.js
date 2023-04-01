import { setLoading } from "context/productContext";
import { toast } from "react-toastify";
import { saveItem, importItems, updateItem } from "services/itemsServices";

export const getProductsAC = (dispatch) => {
  setLoading(dispatch, 2);
  importItems()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => toast.error(err))
    .finally(() => setLoading(dispatch, 3));
};

export const addProductAC = (dispatch, data) => {
  setLoading(dispatch);
  saveItem(data)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => toast.error(err))
    .finally(() => setLoading(dispatch, 3));
};

export const updateProductAC = (dispatch, data) => {
  setLoading(dispatch);
  updateItem(data)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => toast.error(err))
    .finally(() => setLoading(dispatch, 3));
};
