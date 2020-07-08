import React, { useEffect } from "react";
import chatbotUtils from "./chatbotUtils";
import { chatConfig, ChatTemaConfig } from "./data/chatConfig";
import { ChatbotWrapper } from "../../components/chatbot-wrapper/ChatbotWrapper";

type Props = {
  config: ChatTemaConfig;
  openChatTimestamp?: number;
};

const ChatbotTrigger = ({ config, openChatTimestamp }: Props) => {
  useEffect(() => {
    chatbotUtils.clearSessionData();
  }, []);

  useEffect(() => {
    if (openChatTimestamp) {
      chatbotUtils.apneChatbot();
    }
  }, [openChatTimestamp]);

  return openChatTimestamp ? (
    <ChatbotWrapper
      configId={config.configId}
      queueKey={config.queueKey}
      customerKey={chatConfig.customerKey}
    />
  ) : null;
};

export default ChatbotTrigger;
