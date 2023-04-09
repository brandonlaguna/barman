import getTax from "functions/getTax";

export default function calculateTotal(items) {
  let total = 0;
  const totalMixto = 0;
  const totalCredito = 0;
  let totalGeneral = 0;
  const totalPropina = 0;

  items.forEach((item) => {
    const tax = getTax(item.iva);
    if (tax > 0) {
      total += item.venta_uno * (item.cantidad ? item.cantidad : item.cantida);
      totalGeneral += item.venta_uno * (item.cantidad ? item.cantidad : item.cantida);
    } else {
      totalGeneral += item.venta_uno * (item.cantidad ? item.cantidad : item.cantida);
      total += item.venta_uno * (item.cantidad ? item.cantidad : item.cantida);
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
