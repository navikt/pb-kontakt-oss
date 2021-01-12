import { forsidePath } from "./Config";

const Environment = () => {
  const host = window.location.host;
  const subdomain = host.split(`.`)[0];
  const baseAppPath = `${forsidePath}`;

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
  if (subdomain !== `www`) {
    // Preprod - Q0, Q1 etc
    const env = subdomain.split(`-`)[1];
    return {
      miljo: `DEV`,
      baseUrl: `https://www-${env}.nav.no`,
      baseAppPath: baseAppPath,
      appUrl: `https://www-${env}.nav.no${baseAppPath}`,
      apiUrl: `https://www-${env}.nav.no/person/pb-kontakt-oss-api`,
      authUrl: `https://innloggingsstatus.dev.nav.no/person/innloggingsstatus/auth`,
      personInfoApiUrl: `https://www-${env}.nav.no/person/personopplysninger-api`,
      tjenesteUrl: `https://tjenester-${env}.nav.no`,
      loginUrl: `https://loginservice-q.nav.no/login`,
      logoutUrl: `https://loginservice-q.nav.no/slo`,
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
