import { handleLogin } from "./handleLogin";
import { setBadgeColors } from "./setBadgeColors";
import { updateBadgeRegularly } from "./updateBadgeRegularly";

export default defineBackground(
  // NOTE: async function is also supported
  () => {
    (async () => {
      setBadgeColors();
    })();

    updateBadgeRegularly();
    handleLogin();
  }
);
