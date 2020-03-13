import { urls } from "../../Config";
import React from "react";
import { Normaltekst, Systemtittel, Undertekst } from "nav-frontend-typografi";
import { LenkepanelBase } from "nav-frontend-lenkepanel/lib";
import AlertStripe, { AlertStripeType } from "nav-frontend-alertstriper";

const className = "varselpanel";

type Props = {
  tittel?: string,
  tekst: string,
  type: AlertStripeType
}

export const VarselPanel = ({ tittel, tekst, type }: Props) => (
  <AlertStripe className={className} type={type}>
      <Systemtittel className={`${className}__ingress`}>
        {innhold.tittel}
      </Systemtittel>
      <Normaltekst className={`${className}__ingress`}>
        {innhold.ingress}
      </Normaltekst>
  </AlertStripe>
);
