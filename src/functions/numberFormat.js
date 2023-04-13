export function currencyFormat(num) {
  return `$${num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
}

export function numberFormat(num) {
  return num;
}

export function currencyFormatter({ currency, value }) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    minimumFractionDigits: 2,
    currency,
  });
  return formatter.format(value);
}
