import { ChatTema, TemaLenke } from "../../../types/kanaler";
import { paths } from "../../../Config";

export const chatTemaLenker: TemaLenke[] = [
  {
    tema: ChatTema.EURES,
    grafanaId: "chat.eures",
    fallbackTittelId: "chat.eures.tittel",
    url: paths.chat.eures
  }
];
