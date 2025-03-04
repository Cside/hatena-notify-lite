import { HTTPError } from "ky";
import { fetchUnreadCountAndUpdateBadge } from "../background/fn/fetchUnreadCount";

import "./style.css";

const STATUS_CODE_BAD_REQUEST = 400;

await chrome.action.setBadgeText({ text: "" });

try {
  await fetchUnreadCountAndUpdateBadge();
} catch (error) {
  if (
    error instanceof HTTPError &&
    error.response.status === STATUS_CODE_BAD_REQUEST
  ) {
    document.write("はてなにログインしてください");
  }
}
