export const timeStamp = (unixTimeMilliseconds?: number) => {
  const date = unixTimeMilliseconds
    ? new Date(unixTimeMilliseconds)
    : new Date();
  return date.toLocaleTimeString("ja-JP", { hour12: false });
};
