import { LocaleUrl, LocaleString } from "../common-types";

export type FAQLenke = {
  lenke: LocaleUrl;
  tittel: LocaleString;
  priority: number;
};

export type FAQ = {
  isLoaded: boolean;
  faqLenker: FAQLenke[];
};

export const initialFAQ = {
  isLoaded: false,
  faqLenker: []
};
