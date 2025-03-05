import ky from "ky";
import { timeStamp } from "./fn/timeStamp";

const MAX_RETRIES = 3;
const RETRY_INTERVAL = 5_000;

export const kyInstance = ky.create({
  // タイムアウトはデフォルト 10 秒なのでいじらない
  retry: {
    limit: MAX_RETRIES,
    delay: () => RETRY_INTERVAL,
  },
  hooks: {
    afterResponse: [
      (req, _options, res) => {
        console.info(
          // biome-ignore lint/style/useTemplate:
          "%c" + [timeStamp(), res.status, req.method, req.url].join("\t"),
          `color: ${res.ok ? "darkcyan" : "darkgoldenrod"}`,
        );
      },
    ],
  },
});
