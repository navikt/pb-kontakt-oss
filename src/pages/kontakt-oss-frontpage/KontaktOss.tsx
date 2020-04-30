import React, { useEffect } from "react";
import { Sidetittel } from "nav-frontend-typografi";
import FAQ from "./sections/FAQ";
import FeilOgMangler from "./sections/FeilOgMangler";
import Facebook from "./sections/Facebook";
import Tolketjenesten from "./sections/Tolketjenesten";
import Schema from "assets/schema.json";
import { FormattedMessage } from "react-intl";
import Topplinje from "../../components/topp-linje/ToppLinje";
import Chat from "./sections/Chat";
import RingOss from "./sections/RingOss";
import SkrivTilOss from "./sections/SkrivTilOss";
import FinnNavKontor from "./sections/FinnNavKontor";
import KlageOgTilbakemeldinger from "./sections/KlageOgTilbakemeldinger";
import KontaktVeileder from "./sections/KontaktVeileder";
import Pressekontakt from "./sections/Pressekontakt";
import SosialeMedier from "./sections/SosialeMedier";
import { VarselVisning } from "../../components/varsler/VarselVisning";
import { useStore } from "../../providers/Provider";
import { MetaTags } from "../../components/metatags/MetaTags";

const KontaktOssFrontpage = () => {
  const [{ locale }] = useStore();

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
        <Topplinje />
        <div className="frontpage">
          <MetaTags
            titleId={"kontaktoss.tittel"}
            descriptionId={"seo.kontaktoss.description"}
            path={""}
          />
          <header className="frontpage__introduksjon">
            <div className="frontpage__sidetittel">
              <Sidetittel>
                <FormattedMessage id={"kontaktoss.tittel"} />
              </Sidetittel>
            </div>
          </header>
          <VarselVisning />
          <div className="frontpage__content">
            <Chat />
            <div className="frontpage__row">
              <RingOss locale={locale} />
              <FAQ />
            </div>
            <KontaktVeileder />
            <SkrivTilOss />
            <Facebook />
            <FinnNavKontor />
            <Tolketjenesten locale={locale} />
            <KlageOgTilbakemeldinger />
            <FeilOgMangler />
            <Pressekontakt />
            <SosialeMedier />
          </div>
        </div>
        <Topplinje />
      </div>
    </div>
  );
};

export default KontaktOssFrontpage;
