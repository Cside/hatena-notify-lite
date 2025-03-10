import { handleLogin } from "./handleLogin";
import { markAsReadOnRequest } from "./markAsRead";
import { setBadgeColors } from "./setBadgeColors";
import { updateBadgeRegularly } from "./updateBadgeRegularly";

export default defineBackground(
  // NOTE: async function is also supported
  () => {
    (async () => {
      await setBadgeColors();
    })();

    updateBadgeRegularly();
    handleLogin();
    markAsReadOnRequest();
  },
);
