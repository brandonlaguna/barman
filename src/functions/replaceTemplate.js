import PropTypes from "prop-types";
import replaceDataModel from "model/replaceDataModel";

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
  console.log("metodos de pago", paymentMethods);
  const joined = Object.keys(replaceParams[0])
    .map((key) => key)
    .join("|");
  const regex = new RegExp(`${joined}`, "g");
  console.log("dataToReplace", dataToReplace);
  template.forEach((temp) => {
    if (temp.includes(`{{minItems}}`)) {
      itemList.forEach((element) => {
        stringReturn.push([`${element.producto} - ${element.totale} - ${element.cantida}`, "left"]);
      });
      return;
    }

    if (temp.includes(`{{totalTransaction}}`)) {
      stringReturn.push([`P. VOLUNTARIA 0`, "left"]);
      stringReturn.push([`TOTAL FACTURA ${dataToReplace.total}`, "left"]);
      stringReturn.push([`CANCELO ${dataToReplace.total}`, "left"]);
      stringReturn.push([`CAMBIO 0`, "left"]);
      stringReturn.push([`TOTAL PRODUCTOS ${itemList.length}`, "left"]);
      stringReturn.push([`ESTADO Aceptado`, "left"]);
      return;
    }

    if (temp.includes(`{{paymentMethods}}`)) {
      paymentMethods.forEach((payment) => {
        stringReturn.push([`${payment.descripcion}: $${payment.value}`, "left"]);
      });
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
