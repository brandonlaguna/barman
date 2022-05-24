import PropTypes from "prop-types";
import replaceDataModel from "model/replaceDataModel";
import { currencyFormat } from "./numberFormat";

export default function replaceTemplate({
  template,
  itemList,
  dataTransaction,
  dataBusiness,
  clientSelected,
  paymentMethods,
}) {
  const stringReturn = [];
  const replaceParams = [replaceDataModel];

  let dataToReplace = [];

  if (dataTransaction !== undefined) {
    dataToReplace = [...dataToReplace, ...dataTransaction];
  }
  if (dataBusiness !== undefined) {
    dataToReplace = [...dataToReplace, ...dataBusiness];
  }
  if (clientSelected !== undefined) {
    dataToReplace = [...dataToReplace, clientSelected];
  }
  const joined = Object.keys(replaceParams[0])
    .map((key) => key)
    .join("|");
  const regex = new RegExp(`${joined}`, "g");
  template.forEach((temp) => {
    if (temp.includes(`{{minItems}}`)) {
      itemList.forEach((element) => {
        stringReturn.push([
          `x${element.cantida} ${element.producto} - ${element.observacion}`,
          "left",
        ]);
      });
      return;
    }

    if (temp.includes(`{{items}}`)) {
      itemList.forEach((element) => {
        stringReturn.push([
          `x${element.cantida} ${element.producto} \n ${currencyFormat(
            element.venta_uno
          )} ${currencyFormat(element.totale)} `,
          "left",
        ]);
      });
      return;
    }

    if (temp.includes(`{{totalTransaction}}`)) {
      stringReturn.push([`P. VOLUNTARIA ${currencyFormat(0)}`, "left"]);
      stringReturn.push([`TOTAL FACTURA ${currencyFormat(dataToReplace[0].total)}`, "left", true]);
      stringReturn.push([`CANCELO ${currencyFormat(dataToReplace[0].total)}`, "left"]);
      stringReturn.push([`CAMBIO ${currencyFormat(0)}`, "left"]);
      stringReturn.push([`TOTAL PRODUCTOS ${itemList.length}`, "left"]);
      stringReturn.push([`ESTADO Aceptado`, "left"]);
      return;
    }

    if (temp.includes(`{{paymentMethods}}`)) {
      console.log("paymentMethod", paymentMethods);
      if (paymentMethods.length > 0) {
        paymentMethods.forEach((payment) => {
          if (payment.id > 0) {
            stringReturn.push([`${payment.descripcion}: $${payment.value}`, "left"]);
          }
        });
      } else {
        stringReturn.push(["", "left"]);
      }
      return;
    }

    if (temp.includes(`{{footer}}`)) {
      stringReturn.push([
        `CAJERO ${dataToReplace[0].first_name} ${dataToReplace[0].surname}`,
        "left",
      ]);
      stringReturn.push([`Observacion`, "left"]);
      stringReturn.push([`______________________`, "left"]);
      stringReturn.push([`Recibi`, "left"]);
      stringReturn.push([`______________________`, "left"]);
      stringReturn.push([`Software SILPOS 316-6266662 http//www.silpos.com`, "center"]);

      return;
    }

    const replaced = temp.replace(regex, (matched) => dataToReplace[0][replaceParams[0][matched]]);
    if (replaced !== undefined) {
      stringReturn.push([replaced, "center"]);
      return;
    }

    // if (temp.includes(`{{minBusiness}}`)) {
    //   console.log(dataBusiness);
    //   console.log(dataTransaction);
    //   stringReturn.push(`Joelos`);
    //   return;
    // }

    stringReturn.push([temp, "center"]);
  });

  return stringReturn;
}

replaceTemplate.defaultProps = {
  itemList: [],
  dataTransaction: [],
  dataBusiness: [],
  clientSelected: [],
  paymentMethods: [],
};

replaceTemplate.propTypes = {
  template: PropTypes.string.isRequired,
  itemList: PropTypes.instanceOf(Array),
  dataTransaction: PropTypes.instanceOf(Array),
  dataBusiness: PropTypes.instanceOf(Array),
  clientSelected: PropTypes.instanceOf(Array),
  paymentMethods: PropTypes.instanceOf(Array),
};
