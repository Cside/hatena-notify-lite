import { handleLogin } from "./handleLogin";
import { markAsReadOnRequest } from "./markAsRead";
import { setBadgeColors } from "./setBadgeColors";
import { updateBadgeRegularly } from "./updateBadgeRegularly";

export default defineBackground(
  // NOTE: async function is also supported
  () => {
    (async () => {
      await setBadgeColors();
    })();

    updateBadgeRegularly();
    handleLogin();
    markAsReadOnRequest();

    console.log(1);
    chrome.runtime.onInstalled.addListener(async () => {
      console.log(2);
      await chrome.action.setBadgeText({ text: "!" });
    });
  },
);
