import { ChatTema } from "../../../types/kanaler";
import moment from "moment";
import { vars } from "../../../Config";

export type ChatTemaConfig = {
  configId: string,
  queueKey: string,
};

export const gjeldChatbotLansert = moment().isAfter(
  moment("09:00 05-05-2020").format(vars.defaultDatoTidFormat));

export const uforChatbotLansert = moment().isAfter(
  moment("09:00 12-05-2020").format(vars.defaultDatoTidFormat));

export const chatConfig = {
  customerKey: "41155",
  sessionConfig: "https://api.puzzel.com/chat/v1/sessions",
  storageKeys: {
    config: "chatbot-frida_config",
    openState: "chatbot-frida_apen",
    history: "chatbot-frida_historie",
    mailTimeout: "chatbot-frida_mail-timeout"
  },
  tema: {
    [ChatTema.Arbeidsgiver]: {
      configId: "599f9e7c-7f6b-4569-81a1-27202c419953",
      queueKey: "Q_CHAT_BOT"
    },
    [ChatTema.Jobbsoker]: {
      configId: "599f9e7c-7f6b-4569-81a1-27202c419953",
      queueKey: "Q_CHAT_BOT"
    },
    [ChatTema.Syk]: {
      configId: "599f9e7c-7f6b-4569-81a1-27202c419953",
      queueKey: "Q_CHAT_BOT"
    },
    [ChatTema.Familie]: {
      configId: "c3372a51-6434-4770-a0aa-6e4edba3471e",
      queueKey: "Q_CHAT_BOT"
    },
    [ChatTema.Ufor]: uforChatbotLansert
      ? {
        configId: "599f9e7c-7f6b-4569-81a1-27202c419953",
        queueKey: "Q_CHAT_BOT"
      }
      : {
        configId: "599f9e7c-7f6b-4569-81a1-27202c419953",
        queueKey: "Q_CHAT_UFORE"
      },
    [ChatTema.Sosial]: {
      configId: "6564b567-b70b-48e1-b2c5-957c0bc624de",
      queueKey: "Q_CHAT_BOT"
    },
    [ChatTema.Okonomi]: gjeldChatbotLansert
      ? {
        configId: "599f9e7c-7f6b-4569-81a1-27202c419953",
        queueKey: "Q_CHAT_BOT"
      }
      : {
        configId: "599f9e7c-7f6b-4569-81a1-27202c419953",
        queueKey: "Q_CHAT_GJELDSRADGIVNING"
      },
    [ChatTema.EURES]: null
  }
};
