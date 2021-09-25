import I18n from "i18n-js";
import en from "./locales/en";
import se from "./locales/se";
import RNLocalize from "react-native-localize";

I18n.fallbacks = true;
I18n.defaultLocale = "en";
I18n.locale = "en";

// Return preferred language configure in device
I18n.locale = RNLocalize.getLocales()[0].languageCode;

I18n.missingTranslation = function (text) {
  return text;
};

I18n.translations = {
  en,
  se,
};

export default I18n;
export const t = I18n.t;
