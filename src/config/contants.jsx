// GLOBAL CONSTANTS
// -----------------------------------

export const environment = "development";
export const API_URL =
  environment === "development" ? "http://localhost:3001" : "https://api.silpos.com";
export const API_SILPOS_WEB =
  environment === "development" ? "http://localhost/silpos" : "https://pruebas.silpos.com"; // change
export const API_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNpbHBvc3dlYkBnbWFpbC5jb20iLCJpYXQiOjE2NTMxNDg5MzAsImV4cCI6MTY1NTc0MDkzMH0.axvGeabMV5VA-24tCtcFhjILekWlLwXJlJ_O_KCXHfI";
export const API_CAJA_SOURCE = "/app/models/api_caja";

export const APP_COLORS = {
  primary: "#5d9cec",
  success: "#27c24c",
  info: "#23b7e5",
  warning: "#ff902b",
  danger: "#f05050",
  inverse: "#131e26",
  green: "#37bc9b",
  pink: "#f532e5",
  purple: "#7266ba",
  dark: "#3a3f51",
  yellow: "#fad732",
  grayDarker: "#232735",
  grayDark: "#3a3f51",
  gray: "#dde6e9",
  grayLight: "#e4eaec",
  grayLighter: "#edf1f2",
};

export const APP_MEDIAQUERY = {
  desktopLG: 1200,
  desktop: 992,
  tablet: 768,
  mobile: 480,
};
// solo para pruebas, falta inicio de sesion
export const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Origi: "http://localhost:3000",
  authorization: API_TOKEN,
  dbu: "root",
  dbp: "123456789",
  dbd: "silpos",
  Company: 1,
};

export const BANK_ICONS = "../../assets/BankIcon";

export const DEFAULT_TIMEZONE = "Australia/Sydney";

export const ACCESS = {
  user: "silposweb@gmail.com",
  password: "silpos2017",
};

export const LOCAL_STORAGE_USAGE = [
  "accessToken",
  "userData",
  "businessData",
  "clientes",
  "printersConfig",
  "metodosPago",
  "categorias",
  "comprobantes",
  "items",
  "configuracion",
  "tipoTransacciones",
];
