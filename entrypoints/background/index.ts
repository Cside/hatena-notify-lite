import { setBadgeColors } from "./setBadgeColors";
import { updateBadgeCount } from "./updateBadgeCount";

export default defineBackground(
  // NOTE: async function is also supported
  () => {
    (async () => {
      setBadgeColors();
    })();

    updateBadgeCount();
  }
);
