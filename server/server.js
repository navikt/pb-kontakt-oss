require("dotenv").config();
const express = require("express");
const path = require("path");
const os = require("os");
const getHtmlWithDecorator = require("./dekorator");
const logger = require("./logger");
const fetch = require("node-fetch");
const schedule = require("node-schedule");
const officeInfo = require("./enhetsnr-til-enhetsinfo.json");

const server = express();

const buildPath = path.resolve(__dirname, "../build");
const baseUrl = "/person/kontakt-oss/tilbakemeldinger";

const xpHostname =
  process.env.ENV === "dev" ? "https://www.dev.nav.no" : "https://www.nav.no";
const officeBaseUrl = `${xpHostname}/no/nav-og-samfunn/kontakt-nav/kontorer/`;

// Checks if the urls in the office lookup table are valid
// Only runs on the leader pod
const officeUrlCheck = async () => {
  const isLeader = await fetch(`http://${process.env.ELECTOR_PATH}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((json) => {
      return json.name === os.hostname();
    })
    .catch((e) => {
      logger.error(
        `Error while determining leader pod, proceeding as if pod is leader - ${e}`
      );
      return true;
    });

  logger.info(`Running office url check if pod is leader - (${isLeader})`);

  if (!isLeader) {
    return;
  }

  if (!officeInfo) {
    logger.error("Office url error: office info not found on server!");
    return;
  }

  for (const office of Object.values(officeInfo)) {
    const url = `${officeBaseUrl}${office.url}`;

    await fetch(url, {
      method: "HEAD",
      timeout: 5000,
    })
      .then((res) => {
        if (!res.ok) {
          logger.error(
            `Office url error: bad response from ${url} - ${res.status}`
          );
        }
      })
      .catch((e) =>
        logger.error(`Office url error: error while fetching ${url} - ${e}`)
      );
  }
};

// Schedule a daily job to check for invalid office urls
schedule.scheduleJob({ hour: 8, minute: 0, second: 0 }, officeUrlCheck);

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
