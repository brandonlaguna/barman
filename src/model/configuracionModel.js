const getConfiguracion = async () => {
  try {
    const items = localStorage.getItem("configuracion");
    return JSON.parse(items);
  } catch (e) {
    return e;
  }
};

export default getConfiguracion;
