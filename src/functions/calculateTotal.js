import getTax from "functions/getTax";

export default function (items) {
  let total = 0;
  const totalMixto = 0;
  const totalCredito = 0;
  let totalGeneral = 0;
  const totalPropina = 0;

  items.forEach((item) => {
    const tax = getTax(item.iva);
    if (tax > 0) {
      total += item.venta_uno * item.cantidad;
      totalGeneral += item.venta_uno * item.cantidad;
    } else {
      totalGeneral += item.venta_uno * item.cantidad;
      total += item.venta_uno * item.cantidad;
    }
  });

  return {
    total,
    total_mixto: totalMixto,
    total_credito: totalCredito,
    total_general: totalGeneral,
    total_propina: totalPropina,
  };
}
