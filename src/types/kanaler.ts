export enum Kanal {
  RingOss = "ring-oss",
  SkrivTilOss = "skriv-til-oss",
  Chat = "chat-med-oss",
  KontaktVeileder = "kontakt-din-veileder",
  Tilbakemelding = "tilbakemelding",
  Serviceklage = "serviceklage",
  FeilOgMangler = "feil-og-mangler",
  Ros = "ros-til-nav",
  FinnKontor = "finn-kontor",
}

export enum STOTema {
  Jobbsoker = "sto-jobbsoker",
  Syk = "sto-syk",
  Familie = "sto-familie",
  Ufor = "sto-ufor",
  Sosial = "sto-sosial",
  Pensjon = "sto-pensjon",
  Ovrig = "sto-ovrig",
  Hjelpemidler = "sto-hjelpemidler",
  HjelpemidlerGenerelt = "sto-hjelpemidler-generelt",
  HjelpemidlerOrtopedisk = "sto-hjelpemidler-ortopedisk",
  HjelpemidlerBil = "sto-hjelpemidler-bil",
}

export type TemaLenke = {
  tema: STOTema;
  url?: string;
  fallbackTittelId: string;
  grafanaId: string;
  externalUrl?: boolean;
  ikon?: any;
};
