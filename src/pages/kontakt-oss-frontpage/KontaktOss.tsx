import React, { useEffect } from "react";
import { Sidetittel, Undertittel } from "nav-frontend-typografi";
import FAQ from "./sections/FAQ";
import FeilOgMangler from "./sections/FeilOgMangler";
import Facebook from "./sections/Facebook";
import Tolketjenesten from "./sections/Tolketjenesten";
import Schema from "assets/schema.json";
import MetaTags from "react-meta-tags";
import { FormattedMessage, useIntl } from "react-intl";
import BreadcrumbsWrapper from "../../components/breadcrumbs/BreadcrumbsWrapper";
import Chat from "./sections/Chat";
import RingOss from "./sections/RingOss";
import SkrivTilOss from "./sections/SkrivTilOss";
import FinnNavKontor from "./sections/FinnNavKontor";
import KlageOgTilbakemeldinger from "./sections/KlageOgTilbakemeldinger";
import KontaktVeileder from "./sections/KontaktVeileder";
import Pressekontakt from "./sections/Pressekontakt";
import SosialeMedier from "./sections/SosialeMedier";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import { varsler } from "Config";
import Lenke from "nav-frontend-lenker";

const KontaktOssFrontpage = () => {
  const intl = useIntl();

  useEffect(() => {
    /*
      Add schema from assets
    */
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(Schema);
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="frontpage__wrapper">
      <div className="pagecontent pagecontent__frontpage">
        <BreadcrumbsWrapper />
        <div className="frontpage">
          <MetaTags>
            <title>{intl.messages["seo.kontaktoss.tittel"]}</title>
            <meta
              name="description"
              content={intl.messages["seo.kontaktoss.description"] as string}
            />
          </MetaTags>
          <header className="frontpage__introduksjon">
            <div className="frontpage__sidetittel">
              <Sidetittel>
                <FormattedMessage id={"kontaktoss.tittel"} />
              </Sidetittel>
            </div>
          </header>
          {varsler.map(varsel => (
            <AlertStripeInfo key={varsel.tittel}>
              <Undertittel>{varsel.tittel}</Undertittel>
              <div className={"varsel__body"}>{varsel.beskrivelse}</div>
              {varsel.lenke && varsel.lenkeTekst && (
                <Lenke href={varsel.lenke}>{varsel.lenkeTekst}</Lenke>
              )}
            </AlertStripeInfo>
          ))}
          <div className="frontpage__content">
            <Chat />
            <div className="frontpage__row">
              <RingOss />
              <FAQ />
            </div>
            <SkrivTilOss />
            <KontaktVeileder />
            <Facebook />
            <FinnNavKontor />
            <Tolketjenesten />
            <KlageOgTilbakemeldinger />
            <FeilOgMangler />
            <Pressekontakt />
            <SosialeMedier />
          </div>
        </div>
        <BreadcrumbsWrapper />
      </div>
    </div>
  );
};

export default KontaktOssFrontpage;
