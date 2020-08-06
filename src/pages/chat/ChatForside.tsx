import React, { useEffect, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Normaltekst, Sidetittel } from "nav-frontend-typografi";
import Topplinje from "../../components/topp-linje/ToppLinje";
import { useStore } from "../../providers/Provider";
import { Kanal } from "../../types/kanaler";
import { LocaleBlockContent } from "../../components/sanity-blocks/LocaleBlockContent";
import { NavContentLoader } from "../../components/content-loader/NavContentLoader";
import { VarselVisning } from "../../components/varsler/VarselVisning";
import { MetaTags } from "../../components/metatags/MetaTags";
import { paths } from "../../Config";
import { Hovedknapp } from "nav-frontend-knapper";
import PanelBase from "nav-frontend-paneler";
import { logEvent } from "../../utils/logger";
import Snakkeboble from "nav-frontend-snakkeboble";

const cssPrefix = "chat-med-oss";
const sideTittelId = "chat.forside.tittel";

const ChatForside = () => {
  const [showHelper, setShowHelper] = useState(false);
  const [{ themes, channels }] = useStore();
  const placeholderRef = useRef<HTMLDivElement>(null);
  const snakkebobleRef = useRef<HTMLDivElement>(null);

  const chatProps = channels.props[Kanal.Chat];
  const isLoaded = themes.isLoaded && channels.isLoaded;
  const text = chatProps.preamble;
  const ingress = text && <LocaleBlockContent localeBlock={text} />;
  const grafanaId = "chat.start";

  useEffect(() => {
    const chatbotElement =
      document.getElementById("chatbot-frida-knapp") as HTMLDivElement;
    if (!chatbotElement) {
      return;
    }

    if (showHelper) {
      const placeholderElement = placeholderRef.current;
      const snakkebobleElement = snakkebobleRef.current;
      const chatbotParentElement = chatbotElement.parentElement;
      if (!placeholderElement || !snakkebobleElement || !chatbotParentElement) {
        return;
      }
      const pRect = placeholderElement.getBoundingClientRect();
      const cRect = chatbotElement.getBoundingClientRect();
      const x = pRect.left - cRect.left;
      const y = pRect.top - cRect.top;
      chatbotElement.style.transition = "transform 750ms ease-in-out";
      chatbotElement.style.transform = `translate(${x}px, ${y}px)`;
      snakkebobleElement.style.marginLeft = `${cRect.width}px`;
      setTimeout(() => {
        chatbotElement.removeAttribute("style");
        snakkebobleElement.removeAttribute("style");
        placeholderElement.prepend(chatbotElement);
      }, 750);

      return () => {
        chatbotParentElement.append(chatbotElement);
      };
    }
  }, [showHelper]);

  return (
    <div className={`${cssPrefix} pagecontent`}>
        <Topplinje />
        <MetaTags
          titleId={"chat.forside.tittel"}
          descriptionId={"kontaktoss.chat.beskrivelse"}
          path={paths.chat.forside}
        />
        <div className={`${cssPrefix}__header`}>
          <Sidetittel>
            <FormattedMessage id={sideTittelId} />
          </Sidetittel>
        </div>
        <PanelBase className={`${cssPrefix}__panel`}>
          <div className={`${cssPrefix}__panel-ingress`}>
            <VarselVisning kanal={Kanal.Chat} />
            {(isLoaded) ? ingress : <NavContentLoader lines={5} />}
          </div>
          <div className={`${cssPrefix}__panel-start-knapp`}>
            {showHelper ? (
              <div className={`${cssPrefix}__panel-chat-container`} ref={placeholderRef}>
                <div ref={snakkebobleRef}>
                  <Snakkeboble ikonClass={""}>
                    <Normaltekst>
                      <FormattedMessage id={"chat.helper"}/>
                    </Normaltekst>
                  </Snakkeboble>
                </div>
              </div>
            ) : (
              <Hovedknapp
                htmlType={"button"}
                onClick={() => {
                  logEvent({ event: grafanaId });
                  setShowHelper(true);
                }}
                disabled={!isLoaded}
              >
                <FormattedMessage id="chat.knapp.start" />
              </Hovedknapp>
            )}
          </div>
        </PanelBase>
      </div>
  );
};

export default ChatForside;
