import { kyInstance } from "../kyInstance";

const UNREAD_COUNT_API_URL = "https://www.hatena.ne.jp/notify/api/pull";

type ResponseData = {
  last_seen?: number;
  notices: {
    modified: number;
  }[];
};

export const fetchUnreadCount = async () => {
  const res = await kyInstance.get(UNREAD_COUNT_API_URL, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
  const data: ResponseData = await res.json();

  const lastSeen = data.last_seen ?? 0;
  return data.notices.filter((notice) => notice.modified > lastSeen).length;
};

export const fetchUnreadCountAndUpdateBadge = async () => {
  const count = await fetchUnreadCount();
  await chrome.action.setBadgeText({
    text: count === 0 ? "" : count.toString(),
  });
  return count;
};
