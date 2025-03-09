import {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { isNetworkError } from "axios-retry";

interface AxiosConfigWithStartedAt extends InternalAxiosRequestConfig {
  startedAt: number;
}

const COLOR_FOR = {
  SUCCESS: "darkcyan",
  ERROR: "darkgoldenrod",
};

export const axiosLogging = (instance: AxiosInstance) => {
  instance.interceptors.request.use((config) => {
    (config as AxiosConfigWithStartedAt).startedAt = Date.now();
    return config;
  });

  instance.interceptors.response.use(
    (response) => responseLogger(response),
    (error) => errorLogger(error),
  );
};

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
        (error.config as AxiosConfigWithStartedAt).startedAt,
        error.code === "ETIMEDOUT"
          ? "Timeout"
          : isNetworkError(error)
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

const logResponse = (res: AxiosResponse, color: string) =>
  log(
    (res.config as AxiosConfigWithStartedAt).startedAt,
    res.status,
    res.request?.method,
    res.request?.url,
    color,
  );

const log = (
  startedAt: number,
  status: number | string,
  method: string,
  url: string,
  color: string,
) => {
  const date = new Date();
  console.info(
    // biome-ignore lint/style/useTemplate:
    "%c" +
      [
        date.toLocaleTimeString("ja-JP"),
        `${date.getTime() - startedAt}ms`,
        status,
        method,
        url,
      ].join("  "),
    `color: ${color}`,
  );
};
