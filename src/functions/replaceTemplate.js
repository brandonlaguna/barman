import PropTypes from "prop-types";
import replaceDataModel from "model/replaceDataModel";

export default function replaceTemplate({ template, itemList, dataTransaction, dataBusiness }) {
  const stringReturn = [];
  const replaceParams = [replaceDataModel];

  let dataToReplace = [];

  if (dataTransaction !== undefined) {
    dataToReplace = [...dataToReplace, ...dataTransaction];
  }
  if (dataBusiness !== undefined) {
    dataToReplace = [...dataToReplace, ...dataBusiness];
  }
  // const joined = replaceParams.map((k) => Object.keys(k));
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
};

replaceTemplate.propTypes = {
  template: PropTypes.string.isRequired,
  itemList: PropTypes.instanceOf(Array),
  dataTransaction: PropTypes.instanceOf(Array),
  dataBusiness: PropTypes.instanceOf(Array),
};
