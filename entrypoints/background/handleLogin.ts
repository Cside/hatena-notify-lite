import { fetchUnreadCountAndUpdateBadge } from "./fn/fetchUnreadCount";
import { timeStamp } from "./fn/timeStamp";

const METHOD = "POST";
const URL = "https://accounts.hatena.ne.jp/login";

export const handleLogin = () =>
  chrome.webRequest.onBeforeRedirect.addListener(
    async (details) => {
      if (details.method === METHOD) {
        const count = await fetchUnreadCountAndUpdateBadge();
        console.info(`[onLogin] Updated at ${timeStamp()}, Count: ${count}`);
      }
    },
    {
      urls: [URL, `${URL}?*`],
    },
  );
