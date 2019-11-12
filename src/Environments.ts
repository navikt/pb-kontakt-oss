const Environment = () => {
  const host = window.location.host;
  const subdomain = host.split(`.`)[0];

  if (process.env.NODE_ENV === `development`) {
    return {
      miljo: `LOCAL`,
      baseUrl: `https://www.nav.no`,
      baseAppPath: `/person/kontakt-oss`,
      appUrl: `http://localhost:8080/person/kontakt-oss`,
      apiUrl: `http://localhost:8080/person/tilbakemeldinger-api`,
      personInfoApiUrl: `http://localhost:8080/person/personopplysninger-api`,
      tjenesteUrl: `https://tjenester.nav.no`,
      loginUrl: `http://localhost:8080/personbruker-api/local/cookie`,
      logoutUrl: `#`,
      unleashUrl: `#`
    };
  }
  if (subdomain !== `www`) {
    // Preprod - Q0, Q1 etc
    const env = subdomain.split(`-`)[1];
    return {
      miljo: `DEV`,
      baseUrl: `https://www-${env}.nav.no`,
      baseAppPath: `/person/kontakt-oss`,
      appUrl: `https://www-${env}.nav.no/person/kontakt-oss`,
      apiUrl: `https://www-${env}.nav.no/person/tilbakemeldinger-api`,
      personInfoApiUrl: `https://www-${env}.nav.no/person/personopplysninger-api`,
      tjenesteUrl: `https://tjenester-${env}.nav.no`,
      loginUrl: `https://loginservice-q.nav.no/login`,
      logoutUrl: `https://loginservice-q.nav.no/slo`,
      unleashUrl: `https://www-${env}.nav.no/person/dittnav/api/feature`
    };
  }

  return {
    miljo: `PROD`,
    baseUrl: `https://www.nav.no`,
    baseAppPath: `/person/kontakt-oss/ny`, // TODO: Fjern /ny
    appUrl: `https://www.nav.no/person/kontakt-oss/ny`,
    apiUrl: `https://www.nav.no/person/tilbakemeldinger-api`,
    personInfoApiUrl: `https://www.nav.no/person/personopplysninger-api`,
    tjenesteUrl: `https://tjenester.nav.no`,
    loginUrl: `https://loginservice.nav.no/login`,
    logoutUrl: `https://loginservice.nav.no/slo`,
    unleashUrl: `https://www.nav.no/person/dittnav/api/feature`
  };
};

export default Environment;
