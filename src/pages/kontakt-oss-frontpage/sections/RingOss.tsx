import React from "react";
import { FormattedMessage } from "react-intl";
import IkonPanel from "components/ikonpanel/IkonPanel";
import ikon from "assets/forside-ringoss-ikon.svg";
import { urls } from "Config";
import { logEvent } from "utils/logger";
import RouterLenke from "components/routerlenke/RouterLenkeMedChevron";
import { KanalVisning } from "../KanalVisning";
import { Kanal } from "../../../types/kanaler";
import { Locale } from "../../../utils/locale";

const RingOss = ({ locale }: { locale: Locale }) => {
  const tittel = <FormattedMessage id={"kontaktoss.ringoss.tittel"} />;

  const onClick = () => {
    logEvent({ event: "ring-oss" });
  };

  return (
    <IkonPanel ikon={ikon} tittel={tittel} className="ringoss">
      <KanalVisning kanal={Kanal.RingOss}>
        <RouterLenke
          isExternal={true}
          href={urls.ringOss[locale]}
          onClick={onClick}
          className={"lenke__avstand-over"}
        >
          <FormattedMessage id={"kontaktoss.ringoss.knapp"} />
        </RouterLenke>
      </KanalVisning>
    </IkonPanel>
  );
};

export default RingOss;
