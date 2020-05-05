import NavChatbot from "@navikt/nav-chatbot";
import React, { useEffect, useState } from "react";
import { Normaltekst } from "nav-frontend-typografi";
import { openChatbot, setCallbackOnChatbotOpen } from "./ChatbotUtils";

type Props = {
  customerKey: string;
  queueKey: string;
  configId: string;
  onOpen?: () => void;
};

const cssPrefix = "chatbot-wrapper";

export const ChatbotWrapper = ({ customerKey, queueKey, configId, onOpen }: Props) => {
  const isOpenFromStorage = sessionStorage.getItem("chatbot-frida_apen");
  const [chatbotOpened, setChatbotOpened] = useState(isOpenFromStorage === "true");

  useEffect(() => {
    if (chatbotOpened) {
      if (onOpen) {
        onOpen();
      }
    } else {
      setCallbackOnChatbotOpen(() => setChatbotOpened(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatbotOpened]);

  return (
    <div
      className={cssPrefix}
      onClick={() => openChatbot(setChatbotOpened)}
    >
      <div className={`${cssPrefix}__visual ${chatbotOpened ? `${cssPrefix}__visual--open` : ""}`}>
        <Normaltekst className={`${cssPrefix}__text`}>
          {"Chatbot Frida"}
        </Normaltekst>
      </div>
      <NavChatbot
        customerKey={customerKey}
        queueKey={queueKey}
        configId={configId}
      />
    </div>
  );
};
