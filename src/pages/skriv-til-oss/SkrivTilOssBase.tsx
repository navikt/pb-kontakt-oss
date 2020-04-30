import React from "react";
import { Sidetittel } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import TemaLenkepanel from "../../components/lenkepanel/TemaLenkepanel";
import Topplinje from "../../components/topp-linje/ToppLinje";
import { Kanal, TemaLenke } from "../../types/kanaler";
import NavFrontendSpinner from "nav-frontend-spinner";
import { VarselVisning } from "../../components/varsler/VarselVisning";
import { useStore } from "../../providers/Provider";
import { LocaleBlockContent } from "../../components/sanity-blocks/LocaleBlockContent";
import { Varsel } from "../../components/varsler/Varsel";

const cssPrefix = "skriv-til-oss";

type Props = {
  tittelId: string;
  lenkepanelData?: TemaLenke[];
  children: JSX.Element;
};

const SkrivTilOssBase = ({ tittelId, lenkepanelData, children }: Props) => {
  const [{ channels }] = useStore();
  const stoProps = channels.props[Kanal.SkrivTilOss];
  const isClosed = stoProps.status && stoProps.status.closed;
  const closedMsg = stoProps.status && stoProps.status.message;

  return (
    <div className={`${cssPrefix} pagecontent`}>
      <Topplinje />
      <div className={`${cssPrefix}__header`}>
        <Sidetittel>
          <FormattedMessage id={tittelId} />
        </Sidetittel>
      </div>
      {channels.isLoaded ? (
        <>
          <div className={`${cssPrefix}__ingress`}>
            {children}
            <VarselVisning kanal={Kanal.SkrivTilOss}>
              <>
                {isClosed && (
                  <Varsel type={"info"}>
                    <LocaleBlockContent localeBlock={closedMsg}/>
                  </Varsel>
                )}
              </>
            </VarselVisning>
          </div>
          {!isClosed && (
            <div className={`${cssPrefix}__lenke-seksjon`}>
              {lenkepanelData && lenkepanelData.map(lenke => (
                <TemaLenkepanel
                  lenkepanelData={lenke}
                  cssPrefix={cssPrefix}
                  disableIfClosed={true}
                  key={lenke.tema}
                />
              ))}
            </div>
          )}
        </>
      ) : <NavFrontendSpinner />}
    </div>
  );
};

export default SkrivTilOssBase;
