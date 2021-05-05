import amplitude from "amplitude-js";

export const initAmplitude = () => {
  amplitude?.getInstance().init("default", "", {
    apiEndpoint: "amplitude.nav.no/collect-auto",
    saveEvents: false,
    includeUtm: true,
    includeReferrer: true,
    platform: window.location.toString(),
  });
};

const logAmplitudeEventProd = (eventName: string, data?: any): Promise<any> => {
  return new Promise(function (resolve: any) {
    const eventData = data || {};
    eventData.app = "pb-kontakt-oss";
    eventData.origin = "kontakt-oss";
    eventData.originVersion = "unknown";
    amplitude?.getInstance().logEvent(eventName, eventData, resolve);
  });
};

const logAmplitudeEventDev = (eventName: string, data?: any) => {
  console.log(
    `Amplitude event fired: ${eventName} - data: ${JSON.stringify(data)}`
  );
};

export const logAmplitudeEvent =
  process.env.NODE_ENV === "development"
    ? logAmplitudeEventDev
    : logAmplitudeEventProd;

export const logLinkClick = (
  href: string,
  linkText: string | undefined,
  linkGroup?: string
) => {
  logAmplitudeEvent("navigere", {
    destinasjon: href,
    lenketekst: linkText,
    lenkegruppe: linkGroup,
  });
};

export const logPageview = (title: string) =>
  logAmplitudeEvent("sidevisning", {
    sidetittel: title,
  });
