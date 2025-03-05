import { fetchUnreadCountAndUpdateBadge } from "./fn/fetchUnreadCount";
import { timeStamp } from "./fn/timeStamp";

const CONFIG = [
  // NOTE: ここで追加したドメインは wxt.config.ts にも追加する
  {
    label: "onLogin",
    method: "POST",
    url: "https://accounts.hatena.ne.jp/login",
  },
  {
    label: "notice.iframe",
    method: "GET",
    url: "https://www.hatena.ne.jp/notify/notices.iframe", // TODO: index.html と重複してる
  },
  {
    label: "viaHatenaBlog",
    method: "GET",
    url: "https://blog.hatena.ne.jp/-/notifications",
  },
];

export const markAsReadOnRequest = () => {
  for (const config of CONFIG) {
    chrome.webRequest.onBeforeRedirect.addListener(
      async (details) => {
        if (details.method === config.method) {
          const count = await fetchUnreadCountAndUpdateBadge();
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
