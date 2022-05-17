export const getCategories = async () => {
  try {
    const items = localStorage.getItem("categorias");
    return JSON.parse(items).data;
  } catch (e) {
    return e;
  }
};

export const setCategory = async () => "set";
