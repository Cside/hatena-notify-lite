import axios from "axios";
import axiosRetry from "axios-retry";

const MAX_RETRIES = 3;
const RETRY_INTERVAL = 5_000;
const TIMEOUT = 10_000;

const axiosInstance = axios.create({
  adapter: "fetch",
  timeout: TIMEOUT,
});

axiosRetry(axiosInstance, {
  retries: MAX_RETRIES,
  retryDelay: () => RETRY_INTERVAL,
});

export { axiosInstance };
