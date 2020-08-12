import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Sidetittel } from "nav-frontend-typografi";
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
import { Varsel } from "../../components/varsler/Varsel";

const cssPrefix = "chat-med-oss";
const sideTittelId = "chat.forside.tittel";
const grafanaId = "chat.start";
const fridaKnappId = "chatbot-frida-knapp";

const openChatbot = () => {
  const chatButton = document.getElementById(fridaKnappId);
  if (chatButton) {
    chatButton.click();
    logEvent({ event: grafanaId });
  }
};

const ChatForside = () => {
  const [chatError, setChatError] = useState(false);
  const [{ themes, channels }] = useStore();

  const chatProps = channels.props[Kanal.Chat];
  const isLoaded = themes.isLoaded && channels.isLoaded;
  const text = chatProps.preamble;
  const ingress = text && <LocaleBlockContent localeBlock={text} />;

  useEffect(() => {
    const chatbotElement = document.getElementById(fridaKnappId);
    if (!chatbotElement) {
      setChatError(true);
      return;
    }
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
        <PanelBase className={`${cssPrefix}__panel`}>
          <div className={`${cssPrefix}__panel-ingress`}>
            <VarselVisning kanal={Kanal.Chat}>
              <>
                {chatError && <Varsel type={"feil"} tekstId={"varsel.teknisk.feil.chat"} />}
              </>
            </VarselVisning>
            {(isLoaded) ? ingress : <NavContentLoader lines={5} />}
          </div>
          <div className={`${cssPrefix}__panel-start-knapp`}>
            <Hovedknapp
              htmlType={"button"}
              onClick={openChatbot}
              disabled={!isLoaded || chatError}
            >
              <FormattedMessage id="chat.knapp.start" />
            </Hovedknapp>
          </div>
        </PanelBase>
      </div>
  );
};

export default ChatForside;
