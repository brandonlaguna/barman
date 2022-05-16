const getConfiguracion = async () => {
  try {
    const items = localStorage.getItem("auth");
    return JSON.parse(items);
  } catch (e) {
    return e;
  }
};

export default getConfiguracion;
