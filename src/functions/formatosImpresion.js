const formatoImpresion = {
  1: [
    `systemName`,
    `businessName`,
    `NIT businessDocument`,
    `businessAddress`,
    `businessCity`,
    `P.B.X: businessPBX Cel: businessPhone`,
    `_____________________________`,
    `Venta numberTransaction`,
    `MESA# tableNumber`,
    `_____________________________`,
    `Hora: transactionTime Fecha: transactionDate`,
    `DOCUMENTO: clientDocument`,
    `CLIENTE: clientName`,
    `DIR: clientAddress`,
    `CIUDAD: clientCity`,
    `TEL: clientPhone`,
    `_____________________________`,
    `{{items}}`,
    `_____________________________`,
    `{{totalTransaction}}`,
    `F O R M A D E P A G O `,
    `_____________________________`,
    `{{paymentMethods}}`,
    `_____________________________`,
    `{{footer}}`,
  ],
  2: [`Silpos Barman`, `businessName`, `***Cocina***`, `MESA# tableNumber`, `{{minItems}}`],
};

export default formatoImpresion;
