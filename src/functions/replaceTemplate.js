import PropTypes from "prop-types";
import replaceDataModel from "model/replaceDataModel";

export default function replaceTemplate({ template, itemList, dataTransaction, dataBusiness }) {
  const stringReturn = [];
  console.log(dataTransaction);
  console.log(dataBusiness);
  const replaceParams = replaceDataModel;

  let dataToReplace = [...itemList];

  if (dataTransaction !== undefined) {
    dataToReplace = [...dataToReplace, ...dataTransaction];
  }
  if (dataBusiness !== undefined) {
    dataToReplace = [...dataToReplace, ...dataBusiness];
  }

  template.forEach((temp) => {
    console.log(Object.keys(replaceParams), temp);
    if (Object.keys(temp).includes(replaceParams)) {
      console.log("existe", temp, replaceParams[temp], dataToReplace[replaceParams[temp]]);
    }

    // if (temp.includes(`{{minItems}}`)) {
    //   itemList.forEach((element) => {
    //     stringReturn.push(`${element.producto} - ${element.totale} - ${element.cantida}`);
    //   });
    //   return;
    // }

    // if (temp.includes(`{{minBusiness}}`)) {
    //   console.log(dataBusiness);
    //   console.log(dataTransaction);
    //   stringReturn.push(`Joelos`);
    //   return;
    // }

    stringReturn.push(temp);
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
