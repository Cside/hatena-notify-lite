import { timeStamp } from "./fn/timeStamp";

const TARGETS = [
  // NOTE: ここで追加したドメインは wxt.config.ts にも追加する
  // あと、200 でなく 302 が返る場合は onCompleted ではなく onBeforeRedirect にする
  {
    label: "notice.iframe",
    method: "GET",
    url: "https://www.hatena.ne.jp/notify/notices.iframe", // TODO: index.html と重複してる
  },
  {
    label: "onHatenaBlog",
    method: "GET",
    url: "https://blog.hatena.ne.jp/-/notifications",
  },
];

export const markAsReadOnRequest = () => {
  for (const config of TARGETS) {
    chrome.webRequest.onCompleted.addListener(
      async (details) => {
        if (details.method === config.method) {
          const count = 0;
          await chrome.action.setBadgeText({ text: count.toString() });
          console.info(
            `[${config.label}] Updated at ${timeStamp()}, Count: ${count}`,
          );
        }
      },
      {
        urls: [config.url, `${config.url}?*`],
      },
    );
  }
};
