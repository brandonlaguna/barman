import moment from "moment";
import "moment-timezone";

import { DEFAULT_TIMEZONE } from "config/contants";

export const getDate = () => {
  const mont = moment().tz(DEFAULT_TIMEZONE).toDate();
  return mont;
};

export const getTime = () => {
  const hour = moment().tz(DEFAULT_TIMEZONE).hour();
  return hour;
};
