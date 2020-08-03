import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Sidetittel } from "nav-frontend-typografi";
import Topplinje from "../../components/topp-linje/ToppLinje";
import { useStore } from "../../providers/Provider";
import { Kanal } from "../../types/kanaler";
import { LocaleBlockContent } from "../../components/sanity-blocks/LocaleBlockContent";
import { NavContentLoader } from "../../components/content-loader/NavContentLoader";
import { VarselVisning } from "../../components/varsler/VarselVisning";
import { Varsel } from "../../components/varsler/Varsel";
import { MetaTags } from "../../components/metatags/MetaTags";
import Config, { paths } from "../../Config";
import { Hovedknapp } from "nav-frontend-knapper";
import PanelBase from "nav-frontend-paneler";
import { logEvent } from "../../utils/logger";
import { ChatbotWrapper } from "../../components/chatbot-wrapper/ChatbotWrapper";
import { openChatbot } from "../../components/chatbot-wrapper/ChatbotUtils";

const cssPrefix = "chat-med-oss";
const sideTittelId = "chat.forside.tittel";

const ChatForside = () => {
  const [chatActive, setChatActive] = useState(false);
  const [buttonClickedTimestamp, setButtonClickedTimestamp] = useState(0);

  const [{ themes, channels }] = useStore();
  const chatProps = channels.props[Kanal.Chat];
  const isClosed = chatProps?.status?.closed;
  const closedMsg = chatProps?.status?.message;
  const isLoaded = themes.isLoaded && channels.isLoaded;
  const text = chatProps.preamble;
  const ingress = text && <LocaleBlockContent localeBlock={text} />;

  const grafanaId = "chat.start";

  useEffect(() => {
    const chatActiveFromParameter = window.location.search.includes("start");
    const chatActiveFromStorage = !!sessionStorage.getItem("chatbot-frida_config");
    if (chatActiveFromParameter || chatActiveFromStorage) {
      setChatActive(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (buttonClickedTimestamp) {
      setChatActive(true);
      openChatbot(() => null);
    }
  }, [buttonClickedTimestamp]);

  useEffect(() => {
    openChatbot(() => null);
  }, [chatActive]);

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
            <VarselVisning kanal={Kanal.Chat}>
              <>
                {isClosed && (
                  <Varsel type={"info"}>
                    <LocaleBlockContent localeBlock={closedMsg} />
                  </Varsel>
                )}
              </>
            </VarselVisning>
            {(isLoaded) ? ingress : <NavContentLoader lines={5} />}
          </div>
          <div className={`${cssPrefix}__panel-start-knapp`}>
            <Hovedknapp
              htmlType={"button"}
              onClick={() => {
                logEvent({ event: grafanaId });
                setButtonClickedTimestamp(Date.now());
              }}
              disabled={!isLoaded}
            >
              <FormattedMessage id="chat.knapp.start" />
            </Hovedknapp>
          </div>
        </PanelBase>
        {chatActive && (
          <ChatbotWrapper
            configId={Config.vars.chat.configId}
            customerKey={Config.vars.chat.customerKey}
            queueKey={Config.vars.chat.queueKey}
          />)}
      </div>
  );
};

export default ChatForside;
