import { HTTPError } from "ky";
import { fetchUnreadCount } from "../background/fn/fetchUnreadCount";

import "./style.css";

const STATUS_CODE_BAD_REQUEST = 400;

try {
  await fetchUnreadCount();
} catch (error) {
  if (
    error instanceof HTTPError &&
    error.response.status === STATUS_CODE_BAD_REQUEST
  ) {
    document.body.innerHTML = `
      <a href="https://accounts.hatena.ne.jp/login" target="_blank">はてなにログインしてください</a>
    `;
  }
}
