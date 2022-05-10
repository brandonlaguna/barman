import PropTypes from "prop-types";

export default function replaceTemplate({ template, itemList, dataTransaction, dataBusiness }) {
  const stringReturn = [];
  console.log(dataTransaction);
  console.log(dataBusiness);

  template.forEach((temp) => {
    if (temp.includes(`{{minItems}}`)) {
      itemList.forEach((element) => {
        stringReturn.push(`${element.producto} - ${element.totale} - ${element.cantida}`);
      });
    }

    if (temp.includes(`{{minBusiness}}`)) {
      console.log(dataBusiness);
      console.log(dataTransaction);
      stringReturn.push(`Joelos`);
    }
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
