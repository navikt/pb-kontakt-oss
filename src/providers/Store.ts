import { AuthInfo } from "../types/authInfo";
import { KontaktInfo } from "../types/kontaktInfo";
import sprak from "../language/provider";
import { Enheter, FetchEnheter } from "../types/enheter";
import { HTTPError } from "../components/error/Error";
import { Alert, Alerts, initialAlerts } from "../utils/sanity/endpoints/alert";
import { FAQ, FAQLenke, initialFAQ } from "../utils/sanity/endpoints/faq";
import { Channels, ChannelList, initialChannels } from "../utils/sanity/endpoints/channels";
import { initialThemes, ThemeList, Themes } from "../utils/sanity/endpoints/themes";
import { defaultLocale, Locale } from "../utils/locale";
import { Sprak } from "../types/sprak";

export const initialState = {
  fodselsnr: "",
  language: sprak,
  locale: defaultLocale,
  enheter: { status: "LOADING" } as FetchEnheter,
  auth: { authenticated: false } as AuthInfo,
  kontaktInfo: { mobiltelefonnummer: "" },
  visTekniskFeilMelding: false,
  alerts: initialAlerts as Alerts,
  faq: initialFAQ as FAQ,
  channels: initialChannels as Channels,
  themes: initialThemes as Themes
};

export interface Store {
  fodselsnr: string;
  language: Sprak;
  locale: Locale;
  enheter: FetchEnheter;
  auth: AuthInfo;
  kontaktInfo: KontaktInfo;
  visTekniskFeilMelding: boolean;
  alerts: Alerts;
  faq: FAQ;
  channels: Channels;
  themes: Themes;
}

export type Action =
  | {
  type: "SETT_ENHETER_RESULT";
  payload: Enheter[];
} | {
  type: "SETT_ENHETER_ERROR";
  payload: HTTPError;
} | {
  type: "SETT_AUTH_RESULT";
  payload: AuthInfo;
} | {
  type: "SETT_FODSELSNR";
  payload: {
    fodselsnr: string;
  };
} | {
  type: "SETT_KONTAKT_INFO_RESULT";
  payload: KontaktInfo;
} | {
  type: "SETT_ALERTS";
  payload: Array<Alert>;
} | {
  type: "SETT_ALERTS_FETCH_FAILED";
} | {
  type: "SETT_FAQ";
  payload: FAQLenke[];
} | {
  type: "SETT_FAQ_FETCH_FAILED";
} | {
  type: "SETT_CHANNEL_PROPS";
  payload: ChannelList;
} | {
  type: "SETT_CHANNELS_FETCH_FAILED";
} | {
  type: "SETT_THEME_PROPS";
  payload: ThemeList;
} | {
  type: "SETT_THEMES_FETCH_FAILED";
} | {
  type: "SETT_TEKNISK_FEILMELDING";
} | {
  type: "SETT_LOCALE";
  payload: Locale;
};

export const reducer = (state: Store, action: Action) => {
  switch (action.type) {
    case "SETT_AUTH_RESULT":
      return {
        ...state,
        auth: action.payload as AuthInfo
      };
    case "SETT_ENHETER_RESULT":
      return {
        ...state,
        enheter: {
          status: "RESULT",
          data: action.payload
        } as FetchEnheter
      };
    case "SETT_ENHETER_ERROR":
      return {
        ...state,
        enheter: {
          status: "ERROR",
          error: action.payload
        } as FetchEnheter
      };
    case "SETT_FODSELSNR":
      return {
        ...state,
        fodselsnr: action.payload.fodselsnr
      };
    case "SETT_KONTAKT_INFO_RESULT":
      return {
        ...state,
        kontaktInfo: action.payload as KontaktInfo
      };
    case "SETT_ALERTS":
      return {
        ...state,
        alerts: {
          isLoaded: true,
          alerts: action.payload
        }
      };
    case "SETT_ALERTS_FETCH_FAILED": {
      return {
        ...state,
        alerts: { ...state.alerts, isLoaded: true },
        visTekniskFeilMelding: true
      };
    }
    case "SETT_FAQ": {
      return {
        ...state,
        faq: {
          isLoaded: true,
          faqLenker: action.payload.sort((a, b) => b.priority - a.priority)
        }
      };
    }
    case "SETT_FAQ_FETCH_FAILED": {
      return {
        ...state,
        faq: { ...state.faq, isLoaded: true },
        visTekniskFeilMelding: true
      };
    }
    case "SETT_CHANNEL_PROPS": {
      return {
        ...state,
        channels: {
          isLoaded: true,
          props: action.payload
        }
      };
    }
    case "SETT_CHANNELS_FETCH_FAILED": {
      return {
        ...state,
        channels: { ...state.channels, isLoaded: true },
        visTekniskFeilMelding: true
      };
    }
    case "SETT_THEME_PROPS": {
      return {
        ...state,
        themes: {
          isLoaded: true,
          props: action.payload
        }
      };
    }
    case "SETT_THEMES_FETCH_FAILED": {
      return {
        ...state,
        themes: { ...state.themes, isLoaded: true },
        visTekniskFeilMelding: true
      };
    }
    case "SETT_TEKNISK_FEILMELDING":
      return {
        ...state,
        visTekniskFeilMelding: true
      };
    case "SETT_LOCALE":
      return {
        ...state,
        locale: action.payload
      };
    default:
      return state;
  }
};
