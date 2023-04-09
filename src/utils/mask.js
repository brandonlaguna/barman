/**
 * Validacion para campos de tipo texto
 *
 * @param {string} text - texto a modificar
 * @returns {string} string con solo letras donde cada palabra comienza con la primera letra en mayusculas
 */
const onlyLetters = (textInput) => {
  const replaceAll = textInput;
  const text = replaceAll.replace(/[^a-zA-ZÑşŞıİçÇöÖüÜĞğÁÉÍÓÚ ]/g, "");

  return text;
};

/**
 * Validacion para campos de tipo texto en minuscula
 *
 * @param {string} text - texto a modificar
 * @returns {string} string con solo letras donde cada palabra comienza con la primera letra en mayusculas
 */
const onlyLowerLetters = (textInput) => {
  const replaceAll = textInput.toLowerCase();
  const text = replaceAll.replace(/[^a-zÑşŞıİçÇöÖüÜĞğÁÉÍÓÚ]/g, "");

  return text;
};

/**
 * validacion para campos tipo celular
 *
 * @param {string} number - texto a modificar
 * @returns {string} devuelve string con solo números
 */

const onlyNumbers = (numberInput) => {
  const number = numberInput.replace(/[^0-9]/g, "").substring(0, 10);

  return number;
};

/**
 * validacion para campos tipo celular
 *
 * @param {string} number - texto a modificar
 * @returns {string} devuelve string con solo números
 */

const numberCellphone = (numberInput) => {
  const number = numberInput.replace(/[^0-9]/g, "").substring(0, 10);

  return number;
};

/**
 * validación para campos tipo cedula
 *
 * @param {string} number - texto a modificar
 * @returns {string} devuelve string con solo números
 */

const CC = (numberInput) => {
  const number = numberInput.replace(/[^0-9]/g, "").substring(0, 10);

  return number;
};

/**
 * Validación para campos de tipo email
 *
 * @param {string} text - texto a modificar
 * @returns {string} devuelve string con letras, números y algunos caracteres especiales
 */

const email = (textInput) => {
  const lowerCaseAll = textInput.toLowerCase();
  const text = lowerCaseAll.replace(/[^a-zA-Z0-9.@_-]/g, "");

  return text;
};

/**
 * Validacion para los campos de la busqueda avanzada y normal
 *
 * @param {string} text - texto a modificar
 * @returns {string} devuelve string con letras, números y algunos caracteres especiales
 */

const filters = (textInput) => {
  const text = textInput.replace(/[^a-zA-Z0-9/: .@_-]/g, "");

  return text;
};

/**
 * validatcion para formulario tipo de tramite
 *
 * @param {string} text - texto a modificar
 * @param {string} field - nombre del campo a modificar
 * @returns {string} devuelve string con letras, números y algunos caracteres especiales
 */

const typeProcessMask = (textInput, field) => {
  let text = "";
  switch (field) {
    case "code":
      text = textInput.replace(/[^a-zA-Z0-9ñÑ _-]/g, "");
      break;
    case "name":
      text = textInput.replace(/[^a-zA-Z0-9ñÑ @_-]/g, "");
      break;
    case "description":
      text = textInput.replace(/[^a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ: .,@_-]/g, "");
      break;
    default:
      text = textInput.replace(/[^a-zA-Z0-9ñÑ _-]/g, "");
      break;
  }

  return text;
};

/**
 * validatcion para formulario parametrizacion
 *
 * @param {string} text - texto a modificar
 * @param {string} field - nombre del campo a modificar
 * @returns {string} devuelve string con letras, números y algunos caracteres especiales
 */

const parametrizationMask = (textInput, field) => {
  let text = "";
  switch (field) {
    case "clientId":
      text = textInput.replace(/[^a-zA-Z0-9ñÑ _-]/g, "");
      break;
    case "urlATDP":
      text = textInput.replace(/[^a-zA-Z0-9ñÑ/:._-]/g, "");
      break;
    case "user":
      text = textInput.replace(/[^a-zA-Z0-9ñÑ ._-]/g, "");
      break;
    default:
      text = textInput.replace(/[^a-zA-Z0-9ñÑ _-]/g, "");
      break;
  }

  return text;
};

// ComputerequipmentForm validacion ip solo números y el caracter (.)
const validationIp = (textInput) => {
  const chars = textInput.split("");
  let response = "";

  // eslint-disable-next-line no-restricted-syntax
  for (const letra of chars) {
    if (letra.match("^[0-9.\r]*$") !== null) {
      response += letra;
    }
  }

  return response.substring(0, 15);
};

// ComputerequipmentForm validacion mac solo números letras y los caracteres (: o -)
const validationMac = (textInput) => {
  const chars = textInput.split("");
  let response = "";

  // eslint-disable-next-line no-restricted-syntax
  for (const letra of chars) {
    if (letra.match("^[A-Fa-f0-9-:]$") !== null) {
      response += letra;
    }
  }

  return response.substring(0, 17);
};

// ComputerequipmentForm validacion imei solo números
const validationImei = (numberInput) => {
  const chars = numberInput.split("");
  let response = "";

  // eslint-disable-next-line no-restricted-syntax
  for (const letra of chars) {
    if (letra.match("^[0-9\r]*$") !== null) {
      response += letra;
    }
  }

  return response.substring(0, 16);
};

// BusinessUnit validacion solo letras y numeros

const validationCode = (textInput) => {
  const chars = textInput.split("");
  let response = "";

  // eslint-disable-next-line no-restricted-syntax
  for (const letra of chars) {
    if (letra.match("^[A-Za-z0-9]$") !== null) {
      response += letra;
    }
  }

  return response.substring(0, 30);
};

// BusinessUnit y equipment validacion solo letras

const validationOnlyLetters = (textInput) => {
  const chars = textInput.split("");
  let response = "";

  // eslint-disable-next-line no-restricted-syntax
  for (const letra of chars) {
    if (letra.match("^[A-Za-z0-9 ]$") !== null) {
      response += letra;
    }
  }

  return response.substring(0, 100);
};

// BusinessUnit validacion para dirección

const validationAddress = (textInput) => {
  const chars = textInput.split("");
  let response = "";

  // eslint-disable-next-line no-restricted-syntax
  for (const letra of chars) {
    if (letra.match("^[A-Za-z0-9 #-]$") !== null) {
      response += letra;
    }
  }

  return response.substring(0, 100);
};

// Devices validacion para serial

const validationSerial = (textInput) => {
  const chars = textInput.split("");
  let response = "";

  // eslint-disable-next-line no-restricted-syntax
  for (const letra of chars) {
    if (letra.match("^[A-Za-z0-9 -]$") !== null) {
      response += letra;
    }
  }

  return response.substring(0, 50);
};

export {
  onlyLetters,
  numberCellphone,
  CC,
  email,
  filters,
  validationIp,
  validationMac,
  validationImei,
  validationCode,
  validationOnlyLetters,
  validationAddress,
  validationSerial,
  typeProcessMask,
  parametrizationMask,
  onlyLowerLetters,
  onlyNumbers,
};
