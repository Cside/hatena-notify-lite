import { chromeAction } from "../../../src/chromeAction";

export const setBadgeNumber = async (count: number) => {
  await chromeAction.setBadgeText({
    text: count === 0 ? "" : count.toString(),
  });
};
