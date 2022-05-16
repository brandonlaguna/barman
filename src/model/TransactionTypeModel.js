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
        guardarVender: 2,
        tipoTransaccion: 1,
        print: true,
        printPrinter: [1, 2],
      },
      {
        id: 2,
        title: "Remision",
        detail:
          "Tipo de documento que se utiliza cuando existe una relación de compra entre dos partes, y se extiende a la hora en la que una de las partes hace entrega de artículos o productos a la otra.",
        image: `${BANK_ICONS}/interface/remision.png`,
        guardarVender: 2,
        tipoTransaccion: 2,
        print: true,
        printPrinter: [1],
      },
      {
        id: 3,
        title: "Apartado",
        detail:
          "El servicio de apartado consiste en reservar productos de la tienda durante un período determinado para ofrecer la posibilidad de que el cliente realice la compra del producto.",
        image: `${BANK_ICONS}/interface/apartado.png`,
        guardarVender: 2,
        tipoTransaccion: 3,
        print: false,
        printPrinter: [],
      },
      {
        id: 4,
        title: "Cotizacion",
        detail:
          "El término cotización se emplea para referirse a un documento informativo que el departamento de compras, en una empresa o institución, utiliza para entablar una negociación.",
        image: `${BANK_ICONS}/interface/cotizacion.png`,
        guardarVender: 0,
        tipoTransaccion: 1,
        print: true,
        printPrinter: [1],
      },
      {
        id: 5,
        title: "Mesa",
        detail: "Pedido realizado para llevar a la mesa.",
        image: `${BANK_ICONS}/interface/waiter.png`,
        guardarVender: 0,
        tipoTransaccion: 0,
        print: true,
        printPrinter: [2],
      },
    ];
  } catch (e) {
    return e;
  }
};

export default getAllTransactionType;
