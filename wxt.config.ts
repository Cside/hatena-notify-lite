import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: "chrome",
  manifest: {
    default_locale: "ja", // for edge
    permissions: ["alarms", "webRequest"],
    host_permissions: [
      "https://www.hatena.ne.jp/*",
      "https://accounts.hatena.ne.jp/*",
    ],
  },
});
