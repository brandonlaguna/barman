// GLOBAL CONSTANTS
// -----------------------------------

export const environment = "production";
export const server = "online";

export const SILPOS_LOCAL = "https://pruebas.silpos.com";
export const SILPOS_WEB = "https://pruebas.silpos.com";

export const API_URL =
  environment === "development" ? "http://localhost:3001" : "https://api.silpos.com";

export const API_SILPOS_WEB = environment === "development" ? SILPOS_LOCAL : SILPOS_WEB;

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
export const BANK_ICONS = "../../assets/BankIcon";
export const DEFAULT_TIMEZONE = "Australia/Sydney";

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

export const firebaseConfig = {
  apiKey: "AIzaSyCAXrj2RvUtXVTh24lA2pqYe7Sg_bp9pxw",
  authDomain: "barman-pro.firebaseapp.com",
  projectId: "barman-pro",
  storageBucket: "barman-pro.appspot.com",
  messagingSenderId: "496770787350",
  appId: "1:496770787350:web:ca3be5f08e7a22738b6d37",
  measurementId: "G-D4WKKEXWXV",
};
