export const setBadgeNumber = async (count: number) => {
  await chrome.action.setBadgeText({
    text: "!",
  });
};
