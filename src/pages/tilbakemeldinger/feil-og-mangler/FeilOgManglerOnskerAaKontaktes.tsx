import React from "react";
import { useIntl } from "react-intl";
import { Validation } from "calidation";
import { Radio, SkjemaGruppe } from "nav-frontend-skjema";
import { sjekkForFeil } from "../../../utils/validators";
import FeilOgManglerEpost from "./FeilOgManglerEpost";

const FeilgOgManglerOnskerAaKontaktes = () => {
  const intl = useIntl();

  const onskerKontaktConfig = {
    onskerKontakt: {
      isRequired: intl.formatMessage({
        id: "validering.onskerkontakt.pakrevd",
      }),
    },
  };

  const initialValues = {
    onskerKontakt: false,
  };

  return (
    <Validation
      key={"onskerKontakt"}
      config={onskerKontaktConfig}
      initialValues={initialValues}
    >
      {({ errors, fields, submitted, setField }) => {
        return (
          <SkjemaGruppe
            legend={intl.formatMessage({
              id: "felter.onskerkontakt",
            })}
            feil={sjekkForFeil(submitted, errors.onskerKontakt)}
          >
            <Radio
              label={intl.formatMessage({
                id: "felter.onskerkontakt.ja",
              })}
              name={intl.formatMessage({
                id: "felter.onskerkontakt.ja",
              })}
              checked={fields.onskerKontakt === true}
              onChange={() => setField({ onskerKontakt: true })}
            />
            {fields.onskerKontakt && <FeilOgManglerEpost />}
            <Radio
              label={intl.formatMessage({
                id: "felter.onskerkontakt.nei",
              })}
              name={intl.formatMessage({
                id: "felter.onskerkontakt.nei",
              })}
              checked={fields.onskerKontakt === false}
              onChange={() => setField({ onskerKontakt: false })}
            />
          </SkjemaGruppe>
        );
      }}
    </Validation>
  );
};
export default FeilgOgManglerOnskerAaKontaktes;
