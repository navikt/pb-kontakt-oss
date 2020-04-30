import React from "react";
import { FormattedMessage } from "react-intl";

import IkonPanel from "../../../components/ikonpanel/IkonPanel";
import { urls } from "../../../Config";

import ikon from "assets/forside-tolk-ikon.svg";
import RouterLenke from "../../../components/routerlenke/RouterLenkeMedChevron";
import { Locale } from "../../../utils/locale";

const Tolketjenesten = ({ locale }: { locale: Locale }) => {
  const tittel = <FormattedMessage id={"kontaktoss.tolketjenesten.tittel"} />;

  return (
    <IkonPanel ikon={ikon} tittel={tittel}>
      <RouterLenke
        href={urls.tolkeTjenesten.tolketjenesten}
        isExternal={true}
        className={"lenke__avstand-under"}
      >
        <FormattedMessage id={"kontaktoss.tolketjenesten.link"} />
      </RouterLenke>
      <RouterLenke href={urls.tolkeTjenesten.spraktolk[locale]} isExternal={true}>
        <FormattedMessage id={"kontaktoss.tolketjenesten.link.spraktolk"} />
      </RouterLenke>
    </IkonPanel>
  );
};

export default Tolketjenesten;
