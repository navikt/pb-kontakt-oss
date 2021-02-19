import React from "react";
import { Normaltekst, Sidetittel } from "nav-frontend-typografi";
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

const CantTravelLink = () => (
  <a
    href="http://mininnboks.nav.no/sporsmal/skriv/OVRG"
    className="lenkepanel skriv-til-oss__temalenke linkbox__container  lenkepanel--border"
  >
    <div>
      <div>
        <h2 className="typo-undertittel skriv-til-oss__temalenke-header lenkepanel__heading">
          <FormattedMessage id={"skrivtiloss.reise.lenke.tittel"} />
        </h2>
        <div className="skriv-til-oss__lenkepanel-ingress">
          <Normaltekst>
            <FormattedMessage id={"skrivtiloss.reise.lenke.description"} />
          </Normaltekst>
        </div>
      </div>
    </div>
    <span className="lenkepanel__indikator" />
  </a>
);

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
                    <LocaleBlockContent localeBlock={closedMsg} />
                  </Varsel>
                )}
              </>
            </VarselVisning>
          </div>
          {!isClosed && (
            <div className={`${cssPrefix}__lenke-seksjon`}>
              {lenkepanelData &&
                lenkepanelData.map((lenke, i) => (
                  <>
                    {
                      /* Temporary channel - TODO: Remove the code */
                      i === 0 && <CantTravelLink />
                    }
                    <TemaLenkepanel
                      lenkepanelData={lenke}
                      cssPrefix={cssPrefix}
                      disableIfClosed={true}
                      key={lenke.tema}
                    />
                  </>
                ))}
            </div>
          )}
        </>
      ) : (
        <NavFrontendSpinner />
      )}
    </div>
  );
};

export default SkrivTilOssBase;
