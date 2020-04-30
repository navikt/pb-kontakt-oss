import { forsidePath } from "../Config";
import { Action } from "../providers/Store";

export type Locale = "nb" | "en";
export const validLocales: Locale[] = ["nb", "en"];  // :(
export const defaultLocale = "nb" as Locale;

export const localePath = (path: string, locale: Locale) => `${forsidePath}/${locale}${path}`;

const isLocale = (str: string): str is Locale => validLocales.includes(str as Locale);

export const setNewLocale = (locale: Locale, dispatch: (action: Action) => void) => {
  // TODO: bruk regex?
  const subSegments = window.location.pathname
    .split(forsidePath)[1]
    .split("/")
    .slice(2)
    .join("/");
  const newUrl = `${forsidePath}/${locale}/${subSegments}`;

  window.history.pushState({}, "", newUrl);
  dispatch({ type: "SETT_LOCALE", payload: locale });
};

export const setLocaleFromUrl = (dispatch: (action: Action) => void) => {
  const localeFromUrl = window.location.pathname
    .split(forsidePath)[1]
    .split("/")[1];

  if (isLocale(localeFromUrl)) {
    dispatch({ type: "SETT_LOCALE", payload: localeFromUrl });
  }
};
