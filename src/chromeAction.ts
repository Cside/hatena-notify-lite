export const chromeAction =
  // Firefox の mv2 には  chrome.action がないため
  //   https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/action
  //   https://wxt.dev/guide/essentials/config/manifest.html#actions
  (chrome.action as typeof chrome.action | undefined) ?? chrome.browserAction;
