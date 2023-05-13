export const formatAddress = (address) => {
  if (address == undefined) return "";
  return address.substring(0, 6) + "••••" + address.slice(-4);
};
