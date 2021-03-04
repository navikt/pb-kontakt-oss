require("dotenv").config();
const express = require("express");
const path = require("path");
const getHtmlWithDecorator = require("./dekorator");
const logger = require("./logger");
const fetch = require('node-fetch');
const schedule = require('node-schedule');
const officeInfo = require('./enhetsnr-til-enhetsinfo.json');

const server = express();

const buildPath = path.resolve(__dirname, "../build");
const baseUrl = "/person/kontakt-oss";

const officeBaseUrl = "https://www.nav.no/no/nav-og-samfunn/kontakt-nav/kontorer/"
const officeCheckStaggerPeriod = 100;

// Runs a periodic check to see if office urls are valid
schedule.scheduleJob({second: 0}, () => {
  console.log("Running scheduled office url check")

  if (!officeInfo) {
    logger.error('Office data not found on server!');
    return;
  }

  Object.values(officeInfo).forEach((enhet, index) => {
    const url = `${officeBaseUrl}${enhet.url}`;

    setTimeout(() => fetch(url, {
        method: 'HEAD',
        timeout: 10000
      }).then((res) => {
        if (!res.ok) {
          logger.error(`Error response from office url ${url} - ${res.status}`);
        }
      }).catch((e) => logger.error(`Error while fetching office url ${url} - ${e}`))
      , index * officeCheckStaggerPeriod);
  });
});

// Parse application/json
server.use(express.json());
server.use(baseUrl, express.static(buildPath, { index: false }));
server.get(`${baseUrl}/internal/isAlive|isReady`, (req, res) =>
  res.sendStatus(200)
);

// Match everything except internal og static
server.use(/^(?!.*\/(internal|static)\/).*$/, (req, res) => {
  const devOrProd = req.headers.host.split(".")[1] === "dev" ? "dev" : "prod";
  const language = req.originalUrl.indexOf("/en") !== -1 ? "en" : "nb";
  getHtmlWithDecorator(`${buildPath}/index.html`, devOrProd, language)
    .then((html) => {
      res.send(html);
    })
    .catch((e) => {
      logger.error(e);
      res.status(500).send(e);
    });
});

const port = process.env.PORT || 8080;
server.listen(port, () => logger.info(`App listening on port: ${port}`));
