const jsdom = require("jsdom");
const request = require("request");
const NodeCache = require("node-cache");
const logger = require("./logger");
const { JSDOM } = jsdom;

const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * 60;

// Refresh cache every hour
const cache = new NodeCache({
  stdTTL: SECONDS_PER_HOUR,
  checkperiod: SECONDS_PER_MINUTE,
});

const getUrl = (devOrProd, language) => {
  const decoratorUrl =
    devOrProd === "dev"
      ? `https://dekoratoren.dev.nav.no`
      : `https://www.nav.no/dekoratoren`;

  const basePath =
    devOrProd === "dev"
      ? `https://www.dev.nav.no/person/kontakt-oss/`
      : `https://www.nav.no/person/kontakt-oss/`;

  const breadcrumbs = [
    {
      url: `${basePath}/${language}`,
      title: language === "nb" ? "Kontakt oss" : "Contact us",
      handleInApp: true,
    },
  ];

  const availableLanguages = [
    { locale: "nb", url: `${basePath}/nb/` },
    { locale: "en", url: `${basePath}//en/` },
  ];

  const params = `?language=${language}&feedback=true&chatbot=true&availableLanguages=${JSON.stringify(
    availableLanguages
  )}&breadcrumbs=${JSON.stringify(breadcrumbs)}`;

  return `${decoratorUrl}/${params}`;
};

const getDecorator = (devOrProd, language) =>
  new Promise((resolve, reject) => {
    const decorator = cache.get(`${devOrProd}-${language}`);
    if (decorator) {
      resolve(decorator);
    } else {
      request(getUrl(devOrProd, language), (error, response, body) => {
        if (!error && response.statusCode >= 200 && response.statusCode < 400) {
          const { document } = new JSDOM(body).window;
          const prop = "innerHTML";
          const data = {
            NAV_SKIPLINKS: document.getElementById("skiplinks")[prop],
            NAV_SCRIPTS: document.getElementById("scripts")[prop],
            NAV_STYLES: document.getElementById("styles")[prop],
            NAV_HEADING: document.getElementById("header-withmenu")[prop],
            NAV_FOOTER: document.getElementById("footer-withmenu")[prop],
            MEGAMENU_RESOURCES: document.getElementById("megamenu-resources")[
              prop
            ],
          };
          cache.set(`${devOrProd}-${language}`, data);
          logger.info(`${devOrProd}-${language}: Creating cache`);
          resolve(data);
        } else {
          reject(new Error(error));
        }
      });
    }
  });

module.exports = getDecorator;
