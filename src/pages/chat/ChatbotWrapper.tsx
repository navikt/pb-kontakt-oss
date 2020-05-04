import React, { useEffect } from "react";
import NAVChatBot from "@navikt/nav-chatbot";
import chatbotUtils from "./chatbotUtils";
import { chatConfig, ChatTemaConfig } from "./data/chatConfig";

type Props = {
  config: ChatTemaConfig;
  openChatTimestamp: number;
};

const ChatbotWrapper = ({config, openChatTimestamp}: Props) => {
  useEffect(() => {
    chatbotUtils.clearSessionData();
  }, []);

  useEffect(() => {
    if (openChatTimestamp) {
      chatbotUtils.apneChatbot();
    }
  }, [openChatTimestamp]);

  return (
    openChatTimestamp ?
    (
      <NAVChatBot
        configId={config.configId}
        queueKey={config.queueKey}
        customerKey={chatConfig.customerKey}
      />
    ) : null
  );
};

export default ChatbotWrapper;
