import React from "react";
import { FormattedMessage } from "react-intl";
import IkonPanel from "components/ikonpanel/IkonPanel";
import { useLocalePaths } from "Config";
import ikon from "assets/forside-skrivtiloss-ikon.svg";
import { logEvent } from "utils/logger";
import RouterLenke from "components/routerlenke/RouterLenkeMedChevron";
import { KanalVisning } from "../KanalVisning";
import { Kanal } from "../../../types/kanaler";

const SkrivTilOss = () => {
  const tittel = <FormattedMessage id={"kontaktoss.skrivtiloss.tittel"}/>;
  const paths = useLocalePaths();

  const onClick = () => {
    logEvent({event: "skriv-til-oss"});
  };

  return (
    <IkonPanel ikon={ikon} tittel={tittel}>
      <KanalVisning kanal={Kanal.SkrivTilOss}>
        <RouterLenke
          href={paths.skrivTilOss.forside}
          className={"lenke__avstand-over"}
          onClick={onClick}
        >
          <FormattedMessage id={"kontaktoss.skrivtiloss.knapp"}/>
        </RouterLenke>
      </KanalVisning>
    </IkonPanel>
  );
};

export default SkrivTilOss;
