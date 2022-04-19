export const filterPaymentMethods = async (word) => word;

export const getPaymentMethods = async () => {
  try {
    const items = localStorage.getItem("metodosPago");
    return JSON.parse(items);
  } catch (e) {
    return e;
  }
};
