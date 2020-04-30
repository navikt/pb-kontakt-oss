import React from "react";
import { FormattedMessage } from "react-intl";

import IkonPanel from "../../../components/ikonpanel/IkonPanel";
import { urls, useLocalePaths } from "../../../Config";

import ikon from "assets/forside-navkontor-ikon.svg";
import RouterLenke from "../../../components/routerlenke/RouterLenkeMedChevron";

const FinnNavKontor = () => {
  const tittel = <FormattedMessage id={"kontaktoss.navkontor.tittel"} />;
  const paths = useLocalePaths();

  return (
    <IkonPanel ikon={ikon} tittel={tittel} id={"finn-nav-kontor"}>
      <>
        <RouterLenke
          href={urls.finnNavKontor.finnDittNavKontor}
          isExternal={true}
          className={"lenke__avstand-under"}
        >
          <FormattedMessage id="kontaktoss.navkontor.innlogget.lenke" />
        </RouterLenke>
        <RouterLenke
          href={paths.finnDittNavKontorUinnlogget}
          isExternal={false}
          className={"lenke__avstand-under"}
        >
          <FormattedMessage id="kontaktoss.navkontor.uinnlogget.lenke" />
        </RouterLenke>
        <RouterLenke href={urls.finnNavKontor.finnDinHjelpemiddelsentral} isExternal={true}>
          <FormattedMessage id="kontaktoss.hjelpemiddelsentral.lenke" />
        </RouterLenke>
      </>
    </IkonPanel>
  );
};

export default FinnNavKontor;
