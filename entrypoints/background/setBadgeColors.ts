import { chromeAction } from "../../src/chromeAction";

const BACKGROUND_COLOR = "#f4b128";

export const setBadgeColors = async () =>
  chromeAction.setBadgeBackgroundColor({ color: BACKGROUND_COLOR });
