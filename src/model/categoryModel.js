export const getCategories = async () => {
  try {
    const items = localStorage.getItem("categorias");
    return JSON.parse(items);
  } catch (e) {
    return e;
  }
};

export const setCategory = async () => "set";
