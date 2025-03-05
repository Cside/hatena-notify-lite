import { fetchUnreadCountAndUpdateBadge } from "./fn/fetchUnreadCount";
import { timeStamp } from "./fn/timeStamp";

export const markAsRead = () => {
  chrome.webRequest.onBeforeRedirect.addListener(
    async (details) => {
      if (details.method === "POST") {
        const count = await fetchUnreadCountAndUpdateBadge();
        console.info(`[onLogin] Updated at ${timeStamp()}, Count: ${count}`);
      }
    },
    {
      urls: [
        "https://accounts.hatena.ne.jp/login",
        "https://accounts.hatena.ne.jp/login?*",
      ],
    },
  );
};
