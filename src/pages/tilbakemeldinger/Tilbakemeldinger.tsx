import React from "react";
import { lenker } from "./TilbakemeldingerLenker";
import Header from "../../components/header/Header";
import TilbakemeldingLenkepanel from "../../components/lenkepanel/TilbakemeldingLenkepanel";
import { useIntl } from "react-intl";
import Topplinje from "../../components/topp-linje/ToppLinje";
import { useStore } from "../../providers/Provider";
import { MetaTags } from "../../components/metatags/MetaTags";
import { VarselVisning } from "../../components/varsler/VarselVisning";
import { Kanal } from "../../types/kanaler";

const Tilbakemeldinger = () => {
  const intl = useIntl();
  const [{ locale }] = useStore();

  return (
    <>
      <div className="pagecontent">
        <Topplinje />
        <MetaTags
          titleId={"tilbakemeldinger.sidetittel"}
          descriptionId={"seo.tilbakemeldinger.description"}
        />
        <div className={"tilbakemeldinger__tittel"}>
          <Header
            title={intl.formatMessage({ id: "tilbakemeldinger.sidetittel" })}
          />
        </div>
        <VarselVisning kanal={Kanal.Tilbakemelding} visKoronaVarsel={false} />
        {lenker(locale).map((lenke) => (
          <TilbakemeldingLenkepanel
            icon={lenke.icon}
            key={lenke.tittel}
            id={lenke.tittel}
            tittel={intl.messages[lenke.tittel] as string}
            beskrivelse={lenke.beskrivelse}
            to={lenke.lenke}
            lenkeTekst={intl.messages[lenke.lenkeTekst] as string}
            external={lenke.external}
          />
        ))}
      </div>
    </>
  );
};
export default Tilbakemeldinger;
