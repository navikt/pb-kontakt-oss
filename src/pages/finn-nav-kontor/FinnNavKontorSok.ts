const postnrTilEnhetsnrOgPoststed = require("./data/postnr-til-enhetsnr-og-poststed.json");
const stedsnavnTilEnhetsnr = require("./data/stedsnavn-til-enhetsnr.json");
const enhetsnrTilEnhetsinfo = require("./data/enhetsnr-til-enhetsinfo.json");

const stedsnavnArray = Object.keys(stedsnavnTilEnhetsnr);
const norskSort = new Intl.Collator(["no", "nb", "nn"], {usage: "sort"}).compare;

export const minQueryLength = 2;

export enum SokeStatus {
  StedsnavnTreff,
  PostnrTreff,
  IngenTreff,
  QueryFeil,
  UgyldigPostnr,
  VisAlle
}

export type SokeTreff = {
  enhetsnrArray: Array<number>,
  treffString: string,
  treffIndex: number
};

export type SokeResultat = {
  treffArray: Array<SokeTreff>,
  query: string,
  status: SokeStatus
};

export const sanitizeQuery = (query: string) => query
  .toLowerCase()
  .replace(/\. /g, ".")
  .replace(/[ /–]/g, "-")
  .replace(/,/g, "")
  .replace(/[áàâãä]/g, "a")
  .replace(/[ûùúü]/g, "u")
  .replace(/š/g, "s")
  .replace(/ŋ/g, "n");

const isValidPostnrFormat = (nr: string) => {
  const nrSanitized = nr
    .replace(".", "")
    .replace("-", "");
  return nr && nr.length === 4 && nr === nrSanitized && !isNaN(Number(nr));
};

const sortByRelevance = (treffArray: Array<SokeTreff>) => {
  const toppTreff = treffArray.filter(treff => treff.treffIndex === 0)
    .sort((a, b) => norskSort(a.treffString, b.treffString))
    .sort((a, b) => a.treffString.length - b.treffString.length);
  const andreTreff = treffArray.filter(treff => treff.treffIndex !== 0)
    .sort((a, b) => norskSort(a.treffString, b.treffString));

  return [...toppTreff, ...andreTreff];
};

const getQueryFeilResultat = (query: string): SokeResultat => {
  return {treffArray: [], query, status: SokeStatus.QueryFeil};
};

const kjorPostnrSok = (query: string): SokeResultat => {
  if (!isValidPostnrFormat(query)) {
    return getQueryFeilResultat(query);
  }

  const nrUtenLedendeNull = parseInt(query, 10).toString();
  const postnrMapping = postnrTilEnhetsnrOgPoststed[nrUtenLedendeNull];
  return postnrMapping
    ? {
      treffArray: [{
        enhetsnrArray: [postnrMapping.enhetsnr],
        treffString: `${query} ${postnrMapping.poststed}`,
        treffIndex: 0
      }],
      query,
      status: SokeStatus.PostnrTreff
    }
    : {treffArray: [], query, status: SokeStatus.UgyldigPostnr};
};

const kjorStedsnavnSok = (query: string): SokeResultat => {
  const stedQuery = sanitizeQuery(query);

  const treff = stedsnavnArray
    .reduce((acc: Array<SokeTreff>, stedsnavn) => {
      const hitIndex = sanitizeQuery(stedsnavn).indexOf(stedQuery);
      return hitIndex > -1
        ? [...acc, {enhetsnrArray: stedsnavnTilEnhetsnr[stedsnavn], treffString: stedsnavn, treffIndex: hitIndex}] : acc;
    }, []);

  return {
    treffArray: sortByRelevance(treff),
    query,
    status: treff.length > 0 ? SokeStatus.StedsnavnTreff : SokeStatus.IngenTreff
  };
};

export const kjorSokOgReturnerResultat = (query: string): SokeResultat => {
  if (query === ":visalle") {
    return {
      treffArray: [{
        enhetsnrArray: Object.keys(enhetsnrTilEnhetsinfo).map(Number),
        treffString: "Alle kontorer", treffIndex: 0
      }],
      query: "Alle kontorer", status: SokeStatus.VisAlle
    };
  }

  if (!query || query.length < minQueryLength) {
    return getQueryFeilResultat(query);
  }

  if (!isNaN(Number(query))) {
    return kjorPostnrSok(query);
  }

  return kjorStedsnavnSok(query);
};
