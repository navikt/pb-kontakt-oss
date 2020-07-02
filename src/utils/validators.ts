import { SimpleValidatorConfig } from "calidation";
import { KLAGE_TYPE } from "../types/serviceklage";
import { vars } from "../Config";

/*
  Form validators
 */

export const extraValidators = {
  isValidTidsrom: (config: SimpleValidatorConfig<any>) => (value: {
    FORMIDDAG: boolean;
    ETTERMIDDAG: boolean;
  }) => (!(value.FORMIDDAG || value.ETTERMIDDAG) ? config.message : null),

  isValidFeiltyper: (config: SimpleValidatorConfig<any>) => (
    value: KLAGE_TYPE[]
  ) => (!value.length ? config.message : null),

  isValidMelding: (config: SimpleValidatorConfig<any>) => (value: string) =>
    value.length > vars.maksLengdeMelding ? config.message : null,
};

export const sjekkForFeil = (submitted: boolean, error: string | null) =>
  submitted && error ? error : undefined;
