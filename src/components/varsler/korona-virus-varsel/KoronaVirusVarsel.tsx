import Config from "../../../Config";
import React from "react";
import { Normaltekst, Undertekst, Undertittel } from "nav-frontend-typografi";
import { LenkepanelBase } from "nav-frontend-lenkepanel/lib";
import { FormattedMessage } from "react-intl";

const className = "korona-varsel";

export type KoronaVirusVarselInnhold = {
  tittelId: string,
  ingress?: JSX.Element,
  datoTid?: string,
  href: string,
};

type Props = {
  innhold?: KoronaVirusVarselInnhold
};

const defaultInnhold: KoronaVirusVarselInnhold = {
  tittelId: "varsel.koronavirus",
  href: Config.urls.koronaVarsel,
};

export const KoronaVirusVarsel = ({ innhold = defaultInnhold }: Props) => (
  <LenkepanelBase className={`${className} varsel-panel`} href={innhold.href} border={true}>
    <div className={`${className}__ikon-kol`}>
      <div className={`${className}__pulse`} />
      <div className={`${className}__sirkel`} />
    </div>
    <div className={`${className}__tekst-kol`}>
      <Undertittel className={`lenkepanel__heading`}>
        <FormattedMessage id={innhold.tittelId} />
      </Undertittel>
      {innhold.ingress && (
        <Normaltekst className={`${className}__ingress`}>
          {innhold.ingress}
        </Normaltekst>
      )}
      {innhold.datoTid && (
        <Undertekst className={`${className}__dato-tid`}>
          {`Oppdatert: ${innhold.datoTid}`}
        </Undertekst>
      )}
    </div>
  </LenkepanelBase>
);
