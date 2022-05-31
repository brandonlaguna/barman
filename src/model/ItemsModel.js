export function getElementsObjectKey() {
  const elementsKey = [
    "id",
    "barras",
    "articulo",
    "venta_uno",
    "venta_dos",
    "venta_tres",
    "ubicacion",
    "categoria",
    "unidad",
    "total",
    "url_foto",
  ];
  return elementsKey;
}

export function groupItems(itemsObject) {
  const nuevoObjeto = {};
  const items = JSON.parse(itemsObject);
  items.data.forEach((x) => {
    if (!Object.prototype.hasOwnProperty.call(nuevoObjeto, x.categoria)) {
      nuevoObjeto[x.categoria] = {
        items: [],
      };
    }
    nuevoObjeto[x.categoria].items.push({
      id: x.id,
      barras: x.barras,
      articulo: x.articulo,
      venta_uno: x.venta_uno,
      venta_dos: x.venta_dos,
      venta_tres: x.venta_tres,
      ubicacion: x.ubicacion,
      categoria: x.categoria,
      unidad: x.unidad,
      total: x.total,
      url_foto: x.url_foto,
      imp_ipoconsumo: x.imp_ipoconsumo,
      impuesto_dane: x.impuesto_dane,
      invima: x.invima,
      ipoconsumo: x.ipoconsumo,
      iva: x.iva,
      factor_venta: x.factor_venta,
      precio_costo: x.precio_costo,
      descripcion: "",
    });
  });
  return nuevoObjeto;
}

export const getItems = async () => {
  try {
    const items = localStorage.getItem("items");
    return items;
  } catch (e) {
    return e;
  }
};
