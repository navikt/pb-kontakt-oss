import { AlertStripeType } from "nav-frontend-alertstriper";
import { LocaleBlock } from "../common-types";

export type Alert = {
  type: AlertStripeType;
  description: LocaleBlock;
  displayOnAllPages: boolean;
  displayOnSpesificPages: string[];
};

export type Alerts = {
  isLoaded: boolean;
  alerts: Alert[];
};

export const initialAlerts = {
  isLoaded: false,
  alerts: []
};
