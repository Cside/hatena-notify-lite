import { chromeAction } from "../../src/chromeAction";

const BACKGROUND_COLOR: chrome.action.ColorArray = [244, 177, 40, 200];

export const setBadgeColors = async () =>
  chromeAction.setBadgeBackgroundColor({ color: BACKGROUND_COLOR });
