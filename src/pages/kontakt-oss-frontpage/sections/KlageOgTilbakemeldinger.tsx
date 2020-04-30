import React from "react";
import { FormattedMessage } from "react-intl";

import IkonPanel from "../../../components/ikonpanel/IkonPanel";

import { useLocalePaths } from "../../../Config";
import RouterLenke from "../../../components/routerlenke/RouterLenkeMedChevron";
import { Normaltekst } from "nav-frontend-typografi";

const KlageOgTilbakemeldinger = () => {
  const tittel = <FormattedMessage id={"kontaktoss.klage.tittel"} />;

  return (
    <IkonPanel tittel={tittel} className="klage-og-tilbakemeldinger">
      <Normaltekst>
        <RouterLenke
          href={useLocalePaths().tilbakemeldinger.forside}
        >
          <FormattedMessage id="kontaktoss.klage.knapp" />
        </RouterLenke>
      </Normaltekst>
    </IkonPanel>
  );
};

export default KlageOgTilbakemeldinger;
