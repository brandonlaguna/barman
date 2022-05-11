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
    const printerList = getAllPrinters();
    printerList.forEach((element) => {
      const content = replaceTemplate({
        template: element.printerFormat,
        itemList: dataTransaction[0],
      });
      const impresora = new Impresora();
      impresora.setFontSize(1, 1);
      impresora.setEmphasize(0);
      impresora.setAlign("center");
      content.forEach((text) => {
        impresora.write(`${text} \n`);
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
