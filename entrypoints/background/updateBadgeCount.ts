import { kyInstance } from "./kyInstance";
import { timeStamp } from "./utils";

const ALARM_NAME = "update-badge-count";
const ALARM_INTERVAL_MINUTES = 0.5; // 15; //FIXME
const UNREAD_COUNT_API_URL = "https://www.hatena.ne.jp/notify/api/pull";

const fetchUnreadCount = async () => {
  const res = await kyInstance.get(UNREAD_COUNT_API_URL, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
  // TODO success かどうかチェック
  const data: {
    last_seen?: number;
    notices: {
      modified: number;
    }[];
  } = await res.json();

  const lastSeen = data.last_seen ?? 0;
  return data.notices.filter((notice) => notice.modified > lastSeen).length;
};

// NOTE: async function で実行してはいけない
export const updateBadgeCount = async () => {
  // アラームを作成
  chrome.runtime.onInstalled.addListener(async ({ reason }) => {
    if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
      await chrome.alarms.create(ALARM_NAME, {
        delayInMinutes: 0,
        periodInMinutes: ALARM_INTERVAL_MINUTES,
      });
      console.info(
        `[alarm:${ALARM_NAME}] Created at ${timeStamp()}. Next execution: in ${ALARM_INTERVAL_MINUTES} minutes`
      );
    } else {
      const alarm = await chrome.alarms.get(ALARM_NAME);
      if (!alarm) throw new Error(`Failed to get alarm: ${ALARM_NAME}`);

      console.info(
        `[alarm:${alarm.name}] Next execution: ${timeStamp(
          alarm.scheduledTime
        )}`
      );
    }
  });

  // 定期実行
  chrome.alarms.onAlarm.addListener(async (alarm) => {
    switch (alarm.name) {
      case ALARM_NAME: {
        // FIXME: エラー発生した時、どうしましょ⋯
        const count = await fetchUnreadCount();
        await chrome.action.setBadgeText({
          text: count === 0 ? "" : String(count),
        });
        console.info(
          `[alarm:${ALARM_NAME}] Updated at ${timeStamp()}, Count: ${count}, Next execution: in ${ALARM_INTERVAL_MINUTES} minutes`
        );
        break;
      }
      default:
        throw new Error(`Unknown alarm: ${alarm.name}`);
    }
  });
};
