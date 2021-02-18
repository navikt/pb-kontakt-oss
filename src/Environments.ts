import { forsidePath } from "./Config";

const Environment = () => {
  const host = window.location.host;
  const isDev = host.split(`.`)[1] === "dev";
  const baseAppPath = `${forsidePath}`;

  // Localhost
  if (process.env.NODE_ENV === `development`) {
    return {
      miljo: `LOCAL`,
      baseUrl: `http://www.nav.no`,
      baseAppPath: baseAppPath,
      appUrl: `http://localhost:8080${baseAppPath}`,
      apiUrl: `http://localhost:8080/person/pb-kontakt-oss-api`,
      authUrl: `http://localhost:8080/person/innloggingsstatus/auth`,
      personInfoApiUrl: `http://localhost:8080/person/personopplysninger-api`,
      tjenesteUrl: `https://tjenester.nav.no`,
      loginUrl: `http://localhost:8080/personbruker-api/local/cookie`,
      logoutUrl: `#`,
    };
  }

  // NAIS dev
  if (isDev) {
    return {
      miljo: `DEV`,
      baseUrl: `https://www.dev.nav.no`,
      baseAppPath: baseAppPath,
      appUrl: `https://www.dev.nav.no${baseAppPath}`,
      apiUrl: `https://www.dev.nav.no/person/pb-kontakt-oss-api`,
      authUrl: `https://innloggingsstatus.dev.nav.no/person/innloggingsstatus/auth`,
      personInfoApiUrl: `https://www.dev.nav.no/person/personopplysninger-api`,
      tjenesteUrl: `https://tjenester-q1.nav.no`,
      loginUrl: `https://loginservice.dev.nav.no/login`,
      logoutUrl: `https://loginservice.dev.nav.no/slo`,
    };
  }

  return {
    miljo: `PROD`,
    baseUrl: `https://www.nav.no`,
    baseAppPath: baseAppPath,
    appUrl: `https://www.nav.no${baseAppPath}`,
    apiUrl: `https://www.nav.no/person/pb-kontakt-oss-api`,
    authUrl: `https://www.nav.no/person/innloggingsstatus/auth`,
    personInfoApiUrl: `https://www.nav.no/person/personopplysninger-api`,
    tjenesteUrl: `https://tjenester.nav.no`,
    loginUrl: `https://loginservice.nav.no/login`,
    logoutUrl: `https://loginservice.nav.no/slo`,
  };
};

export default Environment;
