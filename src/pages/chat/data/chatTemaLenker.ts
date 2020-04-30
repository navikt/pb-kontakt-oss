import { ChatTema, TemaLenke } from "../../../types/kanaler";
import { paths } from "../../../Config";

export const chatTemaLenker: TemaLenke[] = [
  {
    tema: ChatTema.Jobbsoker,
    grafanaId: "chat.jobbsoker",
    fallbackTittelId: "chat.jobbsoker.tittel",
    url: paths.chat.jobbsoker
  },
  {
    tema: ChatTema.Arbeidsgiver,
    grafanaId: "chat.arbeidsgiver",
    fallbackTittelId: "chat.arbeidsgiver.tittel",
    url: paths.chat.arbeidsgiver
  },
  {
    tema: ChatTema.Syk,
    grafanaId: "chat.syk",
    fallbackTittelId: "chat.syk.tittel",
    url: paths.chat.syk
  },
  {
    tema: ChatTema.Familie,
    grafanaId: "chat.familie",
    fallbackTittelId: "chat.familie.tittel",
    url: paths.chat.familie
  },
  {
    tema: ChatTema.Ufor,
    grafanaId: "chat.ufor",
    fallbackTittelId: "chat.ufor.tittel",
    url: paths.chat.ufor
  },
  {
    tema: ChatTema.Sosial,
    grafanaId: "chat.sosialhjelp",
    fallbackTittelId: "chat.sosialhjelp.tittel",
    url: paths.chat.sosialhjelp
  },
  {
    tema: ChatTema.Okonomi,
    grafanaId: "chat.okonomi",
    fallbackTittelId: "chat.okonomi.tittel",
    url: paths.chat.okonomi
  },
  {
    tema: ChatTema.EURES,
    grafanaId: "chat.eures",
    fallbackTittelId: "chat.eures.tittel",
    url: paths.chat.eures
  }
];
