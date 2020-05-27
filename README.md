# Kontakt oss

Chat, telefon, skriv til oss, klage og tilbakemelding, sosiale medier, m.m.

## Komme i gang

Hent repoet fra github

```
git clone https://github.com/navikt/pb-kontakt-oss.git
```

Installer nødvendige pakker:

```
npm install
```

Start applikasjonen lokalt:

```
npm start
```


## Deployering

Deploy skjer gjennom Github Actions.<br><br>
Deployes til test-miljøer (q1/q6) for versjoner med tag-suffix <b>-test*</b> (f.eks. <b>v.1.0.0-test-rc1</b>).<br>
Deployes til prod og q0 for versjoner i master med øvrige tags (f.eks. <b>v.1.0.0</b>).<br><br>
For å lansere applikasjonen til produksjon / https://www.nav.no/person/kontakt-oss, benytt [npm version](https://docs.npmjs.com/cli/version) til å oppdatere package.json og lage samsvarende Git-tag. Eks:

```
npm version patch -m "Din melding"
```

Push deretter den nye versjonen til GitHub og merge til master.

```
git push && git push --tags
```

Se [Github Actions](https://github.com/navikt/pb-kontakt-oss/actions) for å følge med på deploys.

## Logging

Feil ved API-kall blir logget via frontendlogger og vises i Kibana<br>
[https://logs.adeo.no](https://logs.adeo.no/app/kibana#/discover/ad01c200-4af4-11e9-a5a6-7fddb220bd0c)

## Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot https://github.com/orgs/navikt/teams/personbruker

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #team-personbruker.
