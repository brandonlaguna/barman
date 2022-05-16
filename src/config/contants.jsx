// GLOBAL CONSTANTS
// -----------------------------------

export const environment = "development";
export const API_URL = "https://api.silpos.com";
export const API_SILPOS_WEB =
  environment === "development" ? "https://pruebas.silpos.com" : "https://sistema.silpos.com";
export const API_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRlbW9iYXJAZ21haWwuY29tIiwiaWF0IjoxNjUxMTE5NTkzLCJleHAiOjE2NTM3MTE1OTN9.RV7mxpxyM75ui0ikIaefcslM7WqyXPJ8iwALQTmjzDQ";
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
  authorization: API_TOKEN,
  dbu: "silposco_master",
  dbp: "w4rH%I,75iID",
  dbd: "silposco_demobarmaster",
  Company: 71,
};

export const BANK_ICONS = "../../assets/BankIcon";

export const DEFAULT_TIMEZONE = "Australia/Sydney";

export const ACCESS = {
  user: "demobar@gmail.com",
  password: "827ccb0eea8a706c4c34a16891f84e7b",
};
