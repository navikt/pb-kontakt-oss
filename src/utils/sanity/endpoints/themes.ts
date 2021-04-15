import { STOTema } from "../../../types/kanaler";
import { LocaleBlock, LocaleString, Page } from "../common-types";

export type ThemeProps = {
  _id?: string;
  status?: {
    closed?: boolean;
    message?: LocaleBlock;
  }
  link?: LenkePanel;
  page?: Page;
};

export type Themes = {
  isLoaded: boolean;
  props: ThemeList;
};

export type ThemeList = { [key in STOTema]: ThemeProps };

type LenkePanel = {
  description: LocaleBlock;
  title: LocaleString;
};

export const temaToSanityId = {
  [STOTema.Familie]: "skriv-til-oss-familie",
  [STOTema.Jobbsoker]: "skriv-til-oss-jobbsoker",
  [STOTema.Pensjon]: "skriv-til-oss-pensjonist",
  [STOTema.Syk]: "skriv-til-oss-syk",
  [STOTema.Ufor]: "skriv-til-oss-ufor",
  [STOTema.Sosial]: "skriv-til-oss-sosialhjelp",
  [STOTema.Ovrig]: "skriv-til-oss-ovrig",
  [STOTema.Hjelpemidler]: "skriv-til-oss-hjelpemidler",
  [STOTema.HjelpemidlerGenerelt]: "skriv-til-oss-hjelpemidler-generelt",
  [STOTema.HjelpemidlerOrtopedisk]: "skriv-til-oss-hjelpemidler-ortopedisk",
  [STOTema.HjelpemidlerBil]: "skriv-til-oss-hjelpemidler-bil"
};

const initialProps = Object.keys(temaToSanityId).reduce((acc, tema) =>
  ({ ...acc, [tema]: {} }), {});

export const initialThemes = {
  isLoaded: false,
  props: initialProps
};

export const createCompleteThemeList = (themeProps: ThemeProps[]) =>
  Object.entries(temaToSanityId).reduce((acc, [kanalId, sanityId]) =>
    ({...acc, [kanalId]: themeProps.find(props => props._id === sanityId) || {}}), {});
