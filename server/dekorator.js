const {
  injectDecoratorServerSide,
} = require("@navikt/nav-dekoratoren-moduler/ssr");

const getHtmlWithDecorator = (filePath, devOrProd, language) => {
  const isDev = devOrProd === "dev";
  const basePath = isDev ? `https://www.dev.nav.no` : `https://www.nav.no`;
  return injectDecoratorServerSide({
    env: devOrProd,
    filePath: filePath,
    language: language,
    breadcrumbs: [
      {
        url: `${basePath}/person/kontakt-oss/${language}`,
        title: language === "nb" ? "Kontakt oss" : "Contact us",
        handleInApp: true,
      },
    ],
    availableLanguages: [
      { locale: "nb", url: `${basePath}/person/kontakt-oss/nb/` },
      { locale: "en", url: `${basePath}/person/kontakt-oss/en/` },
    ],
  });
};

module.exports = getHtmlWithDecorator;
