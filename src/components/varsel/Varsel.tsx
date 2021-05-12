import React from "react";
import AlertStripe, { AlertStripeType } from "nav-frontend-alertstriper";
import { FormattedMessage } from "react-intl";

type Props = {
  type: AlertStripeType;
  tekstId?: string;
  children?: JSX.Element;
};

export const Varsel = ({ type, tekstId, children }: Props) => (
  <AlertStripe type={type} className={"varsel-panel"}>
    {tekstId && <FormattedMessage id={tekstId} />}
    {children}
  </AlertStripe>
);
