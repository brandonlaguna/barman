import { getAllPrinters } from "model/printersModel";
import { Impresora } from "services/printerServices";
import replaceTemplate from "functions/replaceTemplate";

const printTransaction = (
  dataTransaction,
  transactionType,
  printPrinter,
  clientSelected,
  paymentMethods
) => {
  // print logic
  if (dataTransaction !== undefined) {
    let printerList = [];
    if (printPrinter === "all") {
      printerList = getAllPrinters();
    } else if (!printPrinter.isNaN || typeof printPrinter === "number") {
      const list = getAllPrinters();
      printerList = list.filter((printer) => printer.printerId === printPrinter);
    } else if (printPrinter.length > 0) {
      const list = getAllPrinters();
      printerList = list.filter((printer) => printPrinter.includes(printer.printerId));
    }
    const businessData = JSON.parse(localStorage.getItem("businessData"));
    const userData = JSON.parse(localStorage.getItem("userData"));
    printerList.forEach((element) => {
      const content = replaceTemplate({
        template: element.printerFormat,
        itemList: dataTransaction[0].data,
        clientSelected,
        paymentMethods,
        dataBusiness: [
          {
            system_name: "Silpos Barman",
            ...dataTransaction[0].data[0],
            ...businessData,
            first_name: userData.first_name,
            surname: userData.surname,
            consecutivo: dataTransaction[0].consecutivo,
          },
        ],
      });
      const impresora = new Impresora();
      impresora.setFontSize(1, 1);
      impresora.setEmphasize(0);
      content.forEach((res) => {
        impresora.setAlign(res[1]);
        impresora.write(`${res[0]} \n`);
      });
      impresora.cut();
      impresora.cutPartial();
      impresora.imprimirEnImpresora(element.printerName).then((valor) => {
        console.log(`Al imprimir: ${valor}`);
      });
    });
  }
};

export default printTransaction;
