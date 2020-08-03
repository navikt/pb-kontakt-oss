import NavChatbot from "@navikt/nav-chatbot";
import React, { useEffect, useRef, useState } from "react";
import { Normaltekst } from "nav-frontend-typografi";
import { chatStorageKeys, openChatbot, setCallbackOnChatbotOpen } from "./ChatbotUtils";

type Props = {
  customerKey: string;
  queueKey: string;
  configId: string;
  onOpen?: () => void;
};

const cssPrefix = "chatbot-wrapper";

const getElementTopPosition = (element: HTMLElement) => {
  return element.getBoundingClientRect().top + window.pageYOffset;
};

export const ChatbotWrapper = ({ customerKey, queueKey, configId, onOpen }: Props) => {
  const isOpenFromStorage = sessionStorage.getItem(chatStorageKeys.apen);
  const [chatbotOpened, setChatbotOpened] = useState(isOpenFromStorage === "true");
  const chatbotRef = useRef<HTMLDivElement>(null);

  const preventFooterOverlap = () => {
    const chatbotElement = chatbotRef.current;
    const footerBottom =
      document.getElementsByClassName("menylinje-bottom")[0] as HTMLElement;
    if (!chatbotElement || !footerBottom) {
      return;
    }

    const scrollOffsetBottom = window.pageYOffset + window.innerHeight;
    const footerOffset = getElementTopPosition(footerBottom);
    if (scrollOffsetBottom - chatbotElement.scrollHeight > footerOffset) {
      chatbotElement.style.top = `${footerOffset}px`;
      chatbotElement.style.position = "absolute";
    } else {
      chatbotElement.removeAttribute("style");
    }
  };

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

  useEffect(() => {
    preventFooterOverlap();

    window.addEventListener("scroll", preventFooterOverlap);
    window.addEventListener("resize", preventFooterOverlap);
    return () => {
      window.removeEventListener("scroll", preventFooterOverlap);
      window.removeEventListener("resize", preventFooterOverlap);
    };
  }, []);

  return (
    <div
      className={cssPrefix}
      ref={chatbotRef}
    >
      <div
        className={`${cssPrefix}__visual`}
        onClick={() => openChatbot(setChatbotOpened)}
      >
        <div className={`${cssPrefix}__text-panel ${chatbotOpened ? `${cssPrefix}__text-panel--open` : ""}`}>
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
    </div>
  );
};
