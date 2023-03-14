import { en, sn } from "../../constants/localization";
import * as Localization from "expo-localization";
import i18n from "i18n-js";
import { useState } from "react";
import * as SecureStore from "expo-secure-store";

i18n.fallbacks = true;
i18n.translations = { en, sn };
i18n.locale = Localization.locale

export  function translate(txt) {
  return i18n.t(txt)
}
export async function setLanguage(locale) {
  await SecureStore.setItemAsync("locale", locale);
}

