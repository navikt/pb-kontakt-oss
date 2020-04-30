import { ChatTema } from "../../../types/kanaler";

type ChatTemasideData = {
  [key in ChatTema]: {
    tittelId: string,
    metaTittelId: string,
    grafanaId: string,
    harChatbot: boolean,
  }
};

export const chatTemaSideData: ChatTemasideData = {
  [ChatTema.Jobbsoker]: {
    tittelId: "chat.jobbsoker.tittel",
    metaTittelId: "chat.jobbsoker.metatittel",
    grafanaId: "chat.start.jobbsoker",
    harChatbot: true
  },
  [ChatTema.Arbeidsgiver]: {
    tittelId: "chat.arbeidsgiver.tittel",
    metaTittelId: "chat.arbeidsgiver.metatittel",
    grafanaId: "chat.start.arbeidsgiver",
    harChatbot: true
  },
  [ChatTema.Familie]: {
    tittelId: "chat.familie.tittel",
    metaTittelId: "chat.familie.metatittel",
    grafanaId: "chat.start.familie",
    harChatbot: true
  },
  [ChatTema.Ufor]: {
    tittelId: "chat.ufor.tittel",
    metaTittelId: "chat.ufor.metatittel",
    grafanaId: "chat.start.ufor",
    harChatbot: false
  },
  [ChatTema.Syk]: {
    tittelId: "chat.syk.tittel",
    metaTittelId: "chat.syk.metatittel",
    grafanaId: "chat.start.syk",
    harChatbot: true
  },
  [ChatTema.Sosial]: {
    tittelId: "chat.sosialhjelp.tittel",
    metaTittelId: "chat.sosialhjelp.metatittel",
    grafanaId: "chat.start.sosial",
    harChatbot: true
  },
  [ChatTema.Okonomi]: {
    tittelId: "chat.okonomi.tittel",
    metaTittelId: "chat.okonomi.metatittel",
    grafanaId: "chat.start.okonomi",
    harChatbot: false
  },
  [ChatTema.EURES]: {
    tittelId: "chat.eures.tittel",
    metaTittelId: "chat.eures.metatittel",
    grafanaId: "chat.start.eures",
    harChatbot: false
  }
};
