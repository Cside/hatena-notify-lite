import axios, { AxiosError, AxiosResponse } from "axios";
import axiosRetry from "axios-retry";

const MAX_RETRIES = 0; // 3; // FIXME
const RETRY_INTERVAL = 1; // FIXME 5_000;
const TIMEOUT = 10_000;

const instance = axios.create({
  adapter: "fetch",
  timeout: TIMEOUT,
});

axiosRetry(instance, {
  retries: MAX_RETRIES,
  retryDelay: () => RETRY_INTERVAL,
});

instance.interceptors.response.use(
  (response) => responseLogger(response),
  (error) => errorLogger(error),
);

export { instance as axiosInstance };

// ==================================================
// Logger
// ==================================================

const COLOR_FOR = {
  SUCCESS: "darkcyan",
  ERROR: "darkgoldenrod",
};

const logResponse = (res: AxiosResponse, color: string) =>
  log(res.status, res.request?.method, res.request?.url, color);

const log = (status: number | string, method: string, url: string, color: string) =>
  console.info(
    // biome-ignore lint/style/useTemplate:
    "%c" + [new Date().toLocaleTimeString("ja-JP"), status, method, url].join("  "),
    `color: ${color}`,
  );

const responseLogger = (res: AxiosResponse): AxiosResponse => {
  logResponse(res, COLOR_FOR.SUCCESS);
  return res;
};

const errorLogger = (error: unknown): unknown => {
  if (error instanceof AxiosError) {
    if (error.response) {
      logResponse(error.response, COLOR_FOR.ERROR);
    } else {
      log(
        error.code === "ETIMEDOUT"
          ? "Timeout"
          : error.code === "ERR_NETWORK"
            ? "NetworkError"
            : (error.code ?? "UndefinedCode"),
        error.request?.method ?? "UndefinedMethod",
        error.request?.url ?? "UndefinedUrl",
        COLOR_FOR.ERROR,
      );
    }
  } else {
    console.error(`Unknown error: ${error}`);
  }
  return error;
};
