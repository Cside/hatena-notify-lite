chrome.webRequest.onCompleted.addListener(
  async (details) => {
    if (details.method === "POST")
      await chrome.action.setBadgeText({ text: "" });
    // FIXME updateBadgeCount();
  },
  {
    urls: [
      "https://accounts.hatena.ne.jp/login",
      "https://accounts.hatena.ne.jp/login?*",
    ],
  }
);
