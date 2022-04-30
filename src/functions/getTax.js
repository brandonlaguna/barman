export default function (taxId = 1) {
  const taxes = {
    1: 0,
    3: 19,
    4: 5,
    5: 8,
  };
  return taxes[taxId];
}
