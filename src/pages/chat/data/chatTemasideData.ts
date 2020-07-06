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
  [ChatTema.EURES]: {
    tittelId: "chat.eures.tittel",
    metaTittelId: "chat.eures.metatittel",
    grafanaId: "chat.start.eures",
    harChatbot: false
  }
};
