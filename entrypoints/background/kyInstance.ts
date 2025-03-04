import ky from "ky";
import { timeStamp } from "./fn/timeStamp";

const MAX_RETRIES = 3;
const RETRY_INTERVAL = 5_000;

const requestStartedAt: Map<string, number | undefined> = new Map();

export const kyInstance = ky.create({
  // タイムアウトはデフォルト 10 秒なのでいじらない
  retry: {
    limit: MAX_RETRIES,
    delay: () => RETRY_INTERVAL,
  },
  hooks: {
    beforeRequest: [
      (req) => {
        requestStartedAt.set(req.url, Date.now());
      },
    ],
    afterResponse: [
      (req, _options, res) => {
        const startedAt = requestStartedAt.get(req.url);
        if (startedAt === undefined) {
          console.warn(`startedAt (url: ${req.url}) is undefined`);
          return;
        }
        const elapsed = `${((Date.now() - startedAt) / 1_000).toFixed(2)}ms`;

        console.info(
          [
            `%c${timeStamp()}`,
            elapsed,
            res.status,
            `${req.method} ${req.url}`,
          ].join("\t"),
          `color: ${res.ok ? "darkcyan" : "darkgoldenrod"}`
        );
      },
    ],
  },
});
