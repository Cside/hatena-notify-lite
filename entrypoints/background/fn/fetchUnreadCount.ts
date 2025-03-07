import { axiosInstance } from "../axiosInstance";
import { setBadgeNumber } from "./setBadgeNumber";

const UNREAD_COUNT_API_URL = "https://www.hatena.ne.jp/notify/api/pull";

type ResponseData = {
  last_seen?: number;
  notices: {
    modified: number;
  }[];
};

export const fetchUnreadCount = async () => {
  const data = (await axiosInstance.get<ResponseData>(UNREAD_COUNT_API_URL)).data;

  const lastSeen = data.last_seen ?? 0;
  return data.notices.filter((notice) => notice.modified > lastSeen).length;
};

export const fetchUnreadCountAndUpdateBadge = async () => {
  const count = await fetchUnreadCount();
  await setBadgeNumber(count);
  return count;
};
