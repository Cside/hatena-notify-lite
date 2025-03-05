import { fetchUnreadCountAndUpdateBadge } from "./fn/fetchUnreadCount";
import { timeStamp } from "./fn/timeStamp";

const ALARM_NAME = "update-badge-count";
const ALARM_INTERVAL_MINUTES = 15;

// NOTE: async function で実行してはいけない
export const updateBadgeRegularly = () => {
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
        // NOTE: エラー発生した時、現状では特に通知せず、何もしていない。
        const count = await fetchUnreadCountAndUpdateBadge();
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
