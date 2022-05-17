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
  console.log(dataTransaction, transactionType, printPrinter);
  if (dataTransaction !== undefined) {
    let printerList = [];
    if (printPrinter === "all") {
      console.log("all");
      printerList = getAllPrinters();
    } else if (!printPrinter.isNaN || typeof printPrinter === "number") {
      console.log(typeof printPrinter, printPrinter);
      const list = getAllPrinters();
      printerList = list.filter((printer) => printer.printerId === printPrinter);
    } else if (printPrinter.length > 0) {
      console.log("por id");
      const list = getAllPrinters();
      printerList = list.filter((printer) => printPrinter.includes(printer.printerId));
    }
    const businessData = JSON.parse(localStorage.getItem("dataEmpresas"));
    console.log("items", dataTransaction[0]);
    printerList.forEach((element) => {
      const content = replaceTemplate({
        template: element.printerFormat,
        itemList: dataTransaction[0],
        clientSelected,
        paymentMethods,
        dataBusiness: [
          {
            system_name: "Silpos Barman",
            ...dataTransaction[0][0],
            ...businessData,
          },
        ],
      });
      const impresora = new Impresora();
      impresora.setFontSize(1, 1);
      impresora.setEmphasize(0);
      console.log("content", content);
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
