export const setBadgeNumber = async (count: number) => {
  await chrome.action.setBadgeText({
    text: count === 0 ? "" : count.toString(),
  });
};
