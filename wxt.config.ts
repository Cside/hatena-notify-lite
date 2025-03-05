import browserslistToEsbuild from "browserslist-to-esbuild";
import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: "chrome",
  vite: () => ({
    build: {
      target: browserslistToEsbuild(),
    },
  }),
  manifest: {
    default_locale: "ja", // for edge
    permissions: ["alarms", "webRequest"],
    host_permissions: [
      // TODO: ドメインの共通化
      "https://www.hatena.ne.jp/*",
      "https://accounts.hatena.ne.jp/*",
      "https://blog.hatena.ne.jp/*",
    ],
  },
});
