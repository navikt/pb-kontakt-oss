export type ChatTemaConfig = {
  configId: string,
  queueKey: string,
};

export const chatConfig = {
  customerKey: "41155",
  sessionConfig: "https://api.puzzel.com/chat/v1/sessions",
  storageKeys: {
    config: "chatbot-frida_config",
    openState: "chatbot-frida_apen",
    history: "chatbot-frida_historie",
    mailTimeout: "chatbot-frida_mail-timeout"
  },
  config : {
    configId: "599f9e7c-7f6b-4569-81a1-27202c419953",
    queueKey: "Q_CHAT_BOT"
  }
};
