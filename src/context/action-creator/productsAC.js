import { setProducts, setLoading, setIsEdited, removeItem } from "context/productContext";
import { toast } from "react-toastify";
import { saveItem, importItems, updateItem, deleteItem } from "services/itemsServices";

export const getProductsAC = (dispatch) => {
  setLoading(dispatch, 2);
  importItems()
    .then((res) => {
      setProducts(dispatch, res.data);
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

export const updateProductAC = (dispatch, data, countEdit) => {
  setLoading(dispatch);
  updateItem(data)
    .then((res) => {
      if (res.data) {
        setIsEdited(dispatch, countEdit);
      }
    })
    .catch((err) => toast.error(err))
    .finally(() => setLoading(dispatch, 3));
};

export const deleteProductAC = (dispatch, data) => {
  setLoading(dispatch, 2);
  deleteItem(data)
    .then((res) => {
      if (res.data) {
        removeItem(dispatch, data.id);
      }
    })
    .catch((err) => toast.error(err))
    .finally(() => setLoading(dispatch, 3));
};
