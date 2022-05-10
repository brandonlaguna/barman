export const getAllPrinters = () => {
  const printers = localStorage.getItem("printersConfig");
  return JSON.parse(printers);
};

export const getPrinterStatus = async () => false;
