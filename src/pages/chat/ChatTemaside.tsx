import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Systemtittel } from "nav-frontend-typografi";
import Topplinje from "../../components/topp-linje/ToppLinje";
import ChatbotWrapper from "./ChatbotWrapper";
import { Hovedknapp } from "nav-frontend-knapper";
import Config from "../../Config";
import PanelBase from "nav-frontend-paneler";
import { fetchServerTidOffset } from "../../clients/apiClient";
import { logEvent } from "../../utils/logger";
import ApningstiderAvvik from "../../components/apningstider/ApningstiderAvvik";
import { useStore } from "../../providers/Provider";
import { ChatTema, Kanal } from "../../types/kanaler";
import { chatTemaSideData } from "./data/chatTemasideData";
import { chatApningstider } from "./data/chatApningtider";
import { chatConfig } from "./data/chatConfig";
import { LocaleBlockContent } from "../../components/sanity-blocks/LocaleBlockContent";
import { NavContentLoader } from "../../components/content-loader/NavContentLoader";
import { VarselVisning } from "../../components/varsler/VarselVisning";
import { Varsel } from "../../components/varsler/Varsel";
import { useLocaleString } from "../../utils/sanity/useLocaleString";
import { MetaTags } from "../../components/metatags/MetaTags";

type Props = {
  chatTema: ChatTema,
  path: string
};

const cssPrefix = "chat-tema";

const ChatTemaside = ({ chatTema, path }: Props) => {
  const [chatButtonClickedTimestamp, setChatButtonClickedTimestamp] = useState();
  const [serverTidOffset, setServerTidOffset] = useState(0);
  const [{ themes, channels }] = useStore();
  const localeString = useLocaleString();

  const startChat = chatTema === ChatTema.EURES
    ? () => window.location.assign(Config.urls.chatEures)
    : () => setChatButtonClickedTimestamp(Date.now());

  const { harChatbot, tittelId, metaTittelId, grafanaId } = chatTemaSideData[chatTema];
  const temaProps = themes.props[chatTema];
  const channelProps = channels.props[Kanal.Chat];
  const isLoaded = themes.isLoaded && channels.isLoaded;
  const isClosed = (channelProps.status && channelProps.status.closed)
    || (temaProps.status && temaProps.status.closed);
  const closedMsg = (temaProps.status && temaProps.status.message)
    || (channelProps.status && channelProps.status.message);

  const text = temaProps.page;
  const tittel = (text && localeString(text.title)) || <FormattedMessage id={tittelId} />;
  const ingress = text && <LocaleBlockContent localeBlock={text.content} />;

  useEffect(() => {
    fetchServerTidOffset(setServerTidOffset);
  }, []);
  const apningsTider = chatApningstider[chatTema];
  const chatErIApningstid = apningsTider
    ? apningsTider.isOpenNow(serverTidOffset)
    : true;
  const chatErNormaltApen = chatErIApningstid || harChatbot;
  const chatVeilederStengtAvAdmin = isClosed && chatErIApningstid;
  const chatErApen = (chatErNormaltApen && !chatVeilederStengtAvAdmin) || harChatbot;

  const chatClientConfig = chatConfig.tema[chatTema];

  useEffect(() => {
    const harStartParameter = window.location.search.includes("start");
    if (harStartParameter && chatErApen) {
      startChat();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={`pagecontent`}>
        <Topplinje />
        <MetaTags
          titleId={metaTittelId}
          path={path}
        />
        <PanelBase className={cssPrefix}>
          <div className={`${cssPrefix}__header`}>
            <Systemtittel>
              {tittel}
            </Systemtittel>
          </div>
          <div className={`${cssPrefix}__panel-ingress`}>
            <VarselVisning kanal={Kanal.Chat}>
              <>
                {!chatErNormaltApen && <Varsel tekstId={"chat.stengt.info"} type={"info"} />}
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
              harChatbot={harChatbot}
            />
          )}
          <div className={`${cssPrefix}__panel-start-knapp`}>
            <Hovedknapp
              htmlType={"button"}
              onClick={() => {
                logEvent({ event: grafanaId });
                startChat();
              }}
              disabled={!chatErApen || !isLoaded}
            >
              <FormattedMessage id={chatErApen ? "chat.knapp.start" : "chat.knapp.stengt"} />
            </Hovedknapp>
          </div>
        </PanelBase>
      </div>
      {chatClientConfig && (
        <ChatbotWrapper
          config={chatClientConfig}
          openChatTimestamp={chatButtonClickedTimestamp}
        />
      )}
    </>
  );
};

export default ChatTemaside;
