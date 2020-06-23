import NavChatbot from "@navikt/nav-chatbot";
import React, { useEffect, useRef, useState } from "react";
import { Normaltekst } from "nav-frontend-typografi";
import { openChatbot, setCallbackOnChatbotOpen } from "./ChatbotUtils";

type Props = {
  customerKey: string;
  queueKey: string;
  configId: string;
  onOpen?: () => void;
};

const cssPrefix = "chatbot-wrapper";

const getElementTopPosition = (element: HTMLElement) => {
  return element.getBoundingClientRect().bottom + window.pageYOffset || 0;
};

export const ChatbotWrapper = ({ customerKey, queueKey, configId, onOpen }: Props) => {
  const isOpenFromStorage = sessionStorage.getItem("chatbot-frida_apen");
  const [chatbotOpened, setChatbotOpened] = useState(isOpenFromStorage === "true");
  const chatbotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatbotOpened) {
      if (onOpen) {
        onOpen();
      }
    } else {
      setCallbackOnChatbotOpen(() => setChatbotOpened(true));
    }

    const chatbotElement = chatbotRef.current;

    if (!chatbotElement) {
      return;
    }

    const element = document.getElementsByClassName("chatbot-wrapper")[0] as HTMLElement;

    if (!element) {
      return;
    }

    const footerBottom =
      document.getElementsByClassName("menylinje-bottom")[0] as HTMLElement;

    if (!footerBottom) {
      return;
    }

    const scrollHandler = () => {
      const scrollOffsetBottom = window.pageYOffset + window.innerHeight;
      const chatbotOffset = getElementTopPosition(chatbotElement);
      const footerOffset = getElementTopPosition(footerBottom);
      if (scrollOffsetBottom > footerOffset) {

      } else {
      }
    };

    document.addEventListener("scroll", scrollHandler);
    return () => document.removeEventListener("scroll", scrollHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatbotOpened]);

  return (
    <div
      className={cssPrefix}
      onClick={() => openChatbot(setChatbotOpened)}
      ref={chatbotRef}
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
