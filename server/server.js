require("dotenv").config();

const express = require("express");
const path = require("path");
const mustacheExpress = require("mustache-express");
const getDecorator = require("./dekorator");
const server = express();

server.set("views", `${__dirname}/../build`);
server.set("view engine", "mustache");
server.engine("html", mustacheExpress());

// parse application/json
server.use(express.json());

server.use((req, res, next) => {
  res.removeHeader("X-Powered-By");
  next();
});

const renderApp = decoratorFragments =>
  new Promise((resolve, reject) =>
    server.render("index.html", decoratorFragments, (err, html) => {
      if (err) reject(err);
      resolve(html);
    })
  );

const startServer = html => {
  server.use(
    "/person/tilbakemeldinger/static/js",
    express.static(path.resolve(`${__dirname}/..`, "build/static/js"))
  );

  server.use(
    "/person/tilbakemeldinger/static/css",
    express.static(path.resolve(`${__dirname}/..`, "build/static/css"))
  );

  server.use(
    "/person/tilbakemeldinger/static/media",
    express.static(path.resolve(`${__dirname}/..`, "build/static/media"))
  );

  server.use(
    "/person/tilbakemeldinger/index.css",
    express.static(path.resolve(`${__dirname}/..`, "build/index.css"))
  );

  server.use(
    "/person/tilbakemeldinger/manifest.json",
    express.static(path.resolve(`${__dirname}/..`, "build/manifest.json"))
  );

  server.use(
    "/person/tilbakemeldinger/favicon.ico",
    express.static(path.resolve(`${__dirname}/..`, "build/favicon.ico"))
  );

  server.get("/person/tilbakemeldinger/internal/alive|ready", (req, res) =>
    res.sendStatus(200)
  );

  server.use("/person/tilbakemeldinger", (req, res) => {
    res.send(html);
  });

  const port = process.env.PORT || 8080;
  server.listen(port, () => console.log(`App listening on port: ${port}`));
};

const logError = (errorMessage, details) => console.log(errorMessage, details);

getDecorator()
  .then(renderApp, error => logError("Failed to get decorator", error))
  .then(startServer, error => logError("Failed to render app", error));

process.on("SIGTERM", () =>
  setTimeout(() => console.log("Har sovet i 30 sekunder"), 30000)
);