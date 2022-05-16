import { getAllPrinters } from "model/printersModel";
import { Impresora } from "services/printerServices";
import replaceTemplate from "functions/replaceTemplate";
// const replaceContent = (content, data) => {
//   console.log(data);
//   const plainString = content.replace(/<[^>]+>/g, "");
//   return plainString;
// };

const printTransaction = (dataTransaction, transactionType, printPrinter) => {
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
    console.log(printerList);

    printerList.forEach((element) => {
      const content = replaceTemplate({
        template: element.printerFormat,
        itemList: dataTransaction[0],
        dataBusiness: [
          {
            razon_social: "Joelos",
            system_name: "Silpos Barman",
            ...dataTransaction[0][0],
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
