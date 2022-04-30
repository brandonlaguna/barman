import { BANK_ICONS } from "config/contants";

const getAllTransactionType = async () => {
  try {
    return [
      {
        id: 1,
        title: "Venta",
        detail:
          "Comprende todas las actividades necesarias para proveer a un cliente o empresa de un producto o servicio.",
        image: `${BANK_ICONS}/interface/venta.png`,
      },
      {
        id: 2,
        title: "Remision",
        detail:
          "Tipo de documento que se utiliza cuando existe una relación de compra entre dos partes, y se extiende a la hora en la que una de las partes hace entrega de artículos o productos a la otra.",
        image: `${BANK_ICONS}/interface/remision.png`,
      },
      {
        id: 3,
        title: "Apartado",
        detail:
          "El servicio de apartado consiste en reservar productos de la tienda durante un período determinado para ofrecer la posibilidad de que el cliente realice la compra del producto.",
        image: `${BANK_ICONS}/interface/apartado.png`,
      },
      {
        id: 4,
        title: "Cotizacion",
        detail:
          "El término cotización se emplea para referirse a un documento informativo que el departamento de compras, en una empresa o institución, utiliza para entablar una negociación.",
        image: `${BANK_ICONS}/interface/cotizacion.png`,
      },
    ];
  } catch (e) {
    return e;
  }
};

export default getAllTransactionType;
