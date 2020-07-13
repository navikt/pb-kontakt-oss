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
import { paths } from "../../Config";
import ChatbotTrigger from "./ChatbotTrigger";
import { Hovedknapp } from "nav-frontend-knapper";
import PanelBase from "nav-frontend-paneler";
import { fetchServerTidOffset } from "../../clients/apiClient";
import { logEvent } from "../../utils/logger";
import ApningstiderAvvik from "../../components/apningstider/ApningstiderAvvik";
import { apningstiderDefault } from "./data/chatApningtider";
import { chatConfig } from "./data/chatConfig";

const cssPrefix = "chat-med-oss";
const sideTittelId = "chat.forside.tittel";

const ChatForside = () => {

  const [chatButtonClickedTimestamp, setChatButtonClickedTimestamp] = useState<number>();
  const [serverTidOffset, setServerTidOffset] = useState(0);
  const [{ themes, channels }] = useStore();
  const chatProps = channels.props[Kanal.Chat];
  const isClosed = chatProps.status && chatProps.status.closed;
  const closedMsg = chatProps.status && chatProps.status.message;

  const startChat = () => setChatButtonClickedTimestamp(Date.now());

  const grafanaId = "chat.start"; // Todo: finnes denne?

  const isLoaded = themes.isLoaded && channels.isLoaded;

  const text = chatProps.preamble;
  const ingress = text && <LocaleBlockContent localeBlock={text} />;

  useEffect(() => {
    fetchServerTidOffset(setServerTidOffset);
  }, []);

  const apningsTider = apningstiderDefault;
  const chatErIApningstid = apningsTider
    ? apningsTider.isOpenNow(serverTidOffset)
    : true;
  const chatVeilederStengtAvAdmin = isClosed && chatErIApningstid;
  const chatClientConfig = chatConfig.config;

  useEffect(() => {
    const harStartParameter = window.location.search.includes("start");
    if (harStartParameter) {
      startChat();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <>
          <PanelBase className={`${cssPrefix}__panel`}>
              <div className={`${cssPrefix}__panel-ingress`}>
                <VarselVisning kanal={Kanal.Chat}>
                  <>
                    {chatVeilederStengtAvAdmin && (
                      <Varsel type={"info"}>
                        <LocaleBlockContent localeBlock={closedMsg} />
                      </Varsel>
                    )}
                  </>
                </VarselVisning>
                {(isLoaded) ? ingress
                  : <NavContentLoader lines={5} />}
              </div>
              {apningsTider && (
                <ApningstiderAvvik
                  apningstider={apningsTider}
                  harChatbot={true}
                />
              )}
              <div className={`${cssPrefix}__panel-start-knapp`}>
                <Hovedknapp
                  htmlType={"button"}
                  onClick={() => {
                    logEvent({ event: grafanaId });
                    startChat();
                  }}
                  disabled={!isLoaded}
                >
                  <FormattedMessage id="chat.knapp.start" />
                </Hovedknapp>
              </div>
            </PanelBase>
          {chatClientConfig && (
            <ChatbotTrigger
              config={chatClientConfig}
              openChatTimestamp={chatButtonClickedTimestamp}
            />
          )}
        </>
      </div>
  );
};

export default ChatForside;
