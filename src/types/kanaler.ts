
export enum Kanal {
  RingOss = "ring-oss",
  SkrivTilOss = "skriv-til-oss",
  Chat = "chat-med-oss",
  KontaktVeileder = "kontakt-veileder"
}

// OBS: denne og STOTema må ikke ha overlappende verdier!
export enum ChatTema {
  EURES = "chat-eures"
}

// OBS: denne og ChatTema må ikke ha overlappende verdier!
export enum STOTema {
  Jobbsoker = "sto-jobbsoker",
  Syk = "sto-syk",
  Familie = "sto-familie",
  Ufor = "sto-ufor",
  Sosial = "sto-sosial",
  Pensjon = "sto-pensjon",
  Hjelpemidler = "sto-hjelpemidler",
  HjelpemidlerGenerelt = "sto-hjelpemidler-generelt",
  HjelpemidlerOrtopedisk = "sto-hjelpemidler-ortopedisk",
  HjelpemidlerBil = "sto-hjelpemidler-bil",
}

export type TemaLenke = {
  tema: ChatTema | STOTema;
  url: string;
  fallbackTittelId: string;
  grafanaId: string;
  externalUrl?: boolean;
  ikon?: any;
};
