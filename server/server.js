require("dotenv").config();
const express = require("express");
const path = require("path");
const getHtmlWithDecorator = require("./dekorator");
const buildPath = path.resolve(__dirname, "../build");
const baseUrl = "/person/kontakt-oss";
const logger = require("./logger");
const server = express();

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
