export const filterClients = async () => console.log("filtro");

export const getClients = async () => {
  try {
    const items = localStorage.getItem("clientes");
    return JSON.parse(items).data;
  } catch (e) {
    return e;
  }
};
