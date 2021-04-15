import { urls } from "../../Config";
import { STOTema, TemaLenke } from "../../types/kanaler";

export const hjelpemidlerLenkepaneler: TemaLenke[] = [
  {
    tema: STOTema.HjelpemidlerGenerelt,
    grafanaId: "hjelpemidler.generelt",
    fallbackTittelId: "skrivtiloss.hjelpemidler.generelt.lenke.tittel",
    url: urls.skrivTilOss.temaHjelpemidler.generelt,
    externalUrl: true,
  },
  {
    tema: STOTema.HjelpemidlerOrtopedisk,
    grafanaId: "hjelpemidler.ortopediske",
    fallbackTittelId: "skrivtiloss.hjelpemidler.ortopediske.lenke.tittel",
    url: urls.skrivTilOss.temaHjelpemidler.ortopediske,
    externalUrl: true,
  },
  {
    tema: STOTema.HjelpemidlerBil,
    grafanaId: "hjelpemidler.bil",
    fallbackTittelId: "skrivtiloss.hjelpemidler.bil.lenke.tittel",
    url: urls.skrivTilOss.temaHjelpemidler.bil,
    externalUrl: true,
  },
];

export const skrivTilOssLenkepaneler: TemaLenke[] = [
  {
    tema: STOTema.Jobbsoker,
    fallbackTittelId: "skrivtiloss.arbeidssoker.lenke.tittel",
    grafanaId: "skrivtiloss.arbeidssoker",
    url: urls.skrivTilOss.jobbsoker,
    externalUrl: true,
  },
  {
    tema: STOTema.Syk,
    fallbackTittelId: "skrivtiloss.syk.lenke.tittel",
    grafanaId: "skrivtiloss.syk",
    url: urls.skrivTilOss.syk,
    externalUrl: true,
  },
  {
    tema: STOTema.Familie,
    fallbackTittelId: "skrivtiloss.familieogbarn.lenke.tittel",
    grafanaId: "skrivtiloss.familieogbarn",
    url: urls.skrivTilOss.familieogbarn,
    externalUrl: true,
  },
  {
    tema: STOTema.Ufor,
    fallbackTittelId: "skrivtiloss.ufor.lenke.tittel",
    grafanaId: "skrivtiloss.ufor",
    url: urls.skrivTilOss.ufor,
    externalUrl: true,
  },
  {
    tema: STOTema.Pensjon,
    fallbackTittelId: "skrivtiloss.pensjonist.lenke.tittel",
    grafanaId: "skrivtiloss.pensjonist",
    url: urls.skrivTilOss.pensjonist,
    externalUrl: true,
  },
  {
    tema: STOTema.Hjelpemidler,
    fallbackTittelId: "skrivtiloss.hjelpemidler.lenke.tittel",
    grafanaId: "skrivtiloss.hjelpemidler",
    url: urls.skrivTilOss.hjelpemidler,
  },
  {
    tema: STOTema.Ovrig,
    fallbackTittelId: "skrivtiloss.ovrig.lenke.tittel",
    grafanaId: "skrivtiloss.ovrig",
    url: urls.skrivTilOss.ovrig,
    externalUrl: true,
  },
  {
    tema: STOTema.Sosial,
    fallbackTittelId: "skrivtiloss.sosial.lenke.tittel",
    grafanaId: "skrivtiloss.sosial",
    externalUrl: true,
  },
];
