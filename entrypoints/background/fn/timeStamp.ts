export const timeStamp = (unixTimeMilliseconds?: number) => {
  const date =
    unixTimeMilliseconds === undefined ? new Date() : new Date(unixTimeMilliseconds);
  return date.toLocaleTimeString("ja-JP", { hour12: false });
};
