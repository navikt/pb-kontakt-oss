# Kontakt oss

![Deploy-to-prod](https://github.com/navikt/pb-kontakt-oss/workflows/Deploy-to-prod/badge.svg) | ![Deploy-to-dev](https://github.com/navikt/pb-kontakt-oss/workflows/Deploy-to-dev/badge.svg)

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
Deployes til dev for versjoner med tag-suffix <b>-dev\*</b> (f.eks. <b>v.1.0.0-dev</b>).<br>
Deployes til prod for versjoner med tag-suffix <b>-prod\*</b> (f.eks. <b>v.1.0.0-prod</b>).<br><br>

```
npm version v.1.0.0-dev
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
