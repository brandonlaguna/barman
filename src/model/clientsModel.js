export const filterClients = async () => null;

export const getClients = async () => {
  try {
    const items = localStorage.getItem("clientes");
    return JSON.parse(items);
  } catch (e) {
    return e;
  }
};

export const dataClients = {
  tipo_doc: 3,
  documento: 0,
  digito: 2,
  nombres: "",
  apellidos: "",
  razon_social: "",
  trade_name: "",
  direccion: "",
  telefonos: "",
  country_id: "46",
  nacimiento: "",
  genero: 0,
  email: "",
  activo: "1",
  fecha: "",
  hora: "",
  precio: 1,
  pagina: "",
  porcentaje: 0.0,
  observaciones: "",
  id_imagen: "",
  type_organization_id: 2,
  type_regime_id: 2,
  type_liability_id: "29",
  tax_detail_id: "5",
  merchant_registration: "No tiene",
  cod_ciudad: "846",
};
