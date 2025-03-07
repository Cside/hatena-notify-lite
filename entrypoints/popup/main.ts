import { HTTPError } from "ky";
import { fetchUnreadCount } from "../background/fn/fetchUnreadCount";
import { setBadgeNumber } from "../background/fn/setBadgeNumber";

import "./style.css";

const STATUS_CODE_BAD_REQUEST = 400;

const iframe = document.querySelector<HTMLIFrameElement>("iframe");
if (!iframe) throw new Error("iframe is not found");

iframe.addEventListener("load", async () => {
  // prod で未読バッヂが消えない場合がある。
  // ソースが古いせいかもしれないが、念の為
  await setBadgeNumber(0);
});

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
