export const formatNumber = (numberString) => {
  const number = parseFloat(numberString.replace(/,/g, '')); // Remove existing commas, if any
  return number.toLocaleString();
};
