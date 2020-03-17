import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import chatTemaLenker from "./ChatLenkepanelData";
import { Normaltekst, Sidetittel } from "nav-frontend-typografi";
import BreadcrumbsWrapper from "../../components/breadcrumbs/BreadcrumbsWrapper";
import TemaLenkepanel from "../../components/lenkepanel/TemaLenkepanel";
import { LenkepanelData } from "../../types/lenker";
import { KoronaVirusVarsel } from "../../components/varsler/korona-virus-varsel/KoronaVirusVarsel";
import { StorPaagangVarsel } from "../../components/varsler/stor-paagang-varsel/StorPaagangVarsel";
import NavFrontendSpinner from "nav-frontend-spinner";
import { useStore } from "../../providers/Provider";
import { Kanal } from "../../types/kanaler";

const cssPrefix = "chat-med-oss";
const sideTittelId = "chat.forside.tittel";

const ChatForside = () => {
  const documentTitle = `${useIntl().formatMessage({ id: sideTittelId })} - www.nav.no`;
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);
  const [{ channels, visTekniskFeilMelding }, dispatch] = useStore();

  if (!channels.isLoaded) {
    return <NavFrontendSpinner />;
  }

  const chatProps = channels.props[Kanal.Chat];

  return (
    <>
      <div className={`${cssPrefix} pagecontent`}>
        <BreadcrumbsWrapper />
        <div className={`${cssPrefix}__header`}>
          <Sidetittel>
            <FormattedMessage id={sideTittelId} />
          </Sidetittel>
        </div>
        <div className={`${cssPrefix}__ingress`}>
          <Normaltekst>
            <FormattedMessage id="chat.forside.ingress" />
          </Normaltekst>
          <KoronaVirusVarsel />
          <StorPaagangVarsel />
        </div>
        <div className={`${cssPrefix}__temapanel-seksjon`}>
          {
            chatTemaLenker.map((lenkePanelData: LenkepanelData) => (
                <TemaLenkepanel
                  lenkePanelData={lenkePanelData}
                  cssPrefix={cssPrefix}
                  key={lenkePanelData.url}
                />
              )
            )
          }
        </div>
      </div>
    </>
  );
};

export default ChatForside;
