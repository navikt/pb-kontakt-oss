import { HTTPError } from "../components/error/Error";

const { frontendlogger } = window as any;

export const logApiError = (url: string, err: HTTPError) => {
  const error = `Feil ved henting av data: ${url} - ${err.code} ${err.text}`;

  const title = "tilbakemeldinger.apiclient.error";
  const tags = {};
  const fields = {
    status: err.code,
    statusText: err.text,
    url
  };

  if (frontendlogger) {
    frontendlogger.error(error);
    frontendlogger.event(title, fields, tags);
  }
};

export const logEvent = (fields: object, tags?: object) => {
  const title = "tilbakemeldinger.apiclient";
  if (frontendlogger) {
    frontendlogger.event(title, fields, tags || {});
  }
};
