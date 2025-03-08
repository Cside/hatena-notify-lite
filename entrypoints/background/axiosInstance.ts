import axios from "axios";
import axiosRetry from "axios-retry";
import { axiosLogging } from "./axiosLogging";

const MAX_RETRIES = 3;
const RETRY_INTERVAL = 5_000;
const TIMEOUT = 10_000;

const instance = axios.create({
  adapter: "fetch",
  timeout: TIMEOUT,
});

axiosRetry(instance, {
  retries: MAX_RETRIES,
  retryDelay: () => RETRY_INTERVAL,
});

axiosLogging(instance);

export { instance as axiosInstance };
