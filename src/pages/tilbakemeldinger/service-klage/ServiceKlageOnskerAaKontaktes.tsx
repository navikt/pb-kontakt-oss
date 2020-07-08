import React from "react";
import { useIntl } from "react-intl";
import { Validation } from "calidation";
import { Radio, SkjemaGruppe } from "nav-frontend-skjema";
import { sjekkForFeil } from "../../../utils/validators";
import ServiceKlageTelefon from "./ServiceKlageTelefon";
import ServiceKlageKontaktBedrift from "./ServiceKlageKontaktBedrift";

const ServiceKlageOnskerAaKontaktes = () => {
  const intl = useIntl();
  const initialValues = {} as any;
  const onskerKontaktConfig = {
    onskerKontakt: {
      isRequired: intl.formatMessage({
        id: "validering.onskerkontakt.pakrevd",
      }),
    },
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
              id: "tilbakemeldinger.serviceklage.form.onskersvar",
            })}
            feil={sjekkForFeil(submitted, errors.onskerKontakt)}
          >
            <Radio
              label={intl.formatMessage({
                id: "tilbakemeldinger.serviceklage.form.onskersvar.ja",
              })}
              name={intl.formatMessage({
                id: "tilbakemeldinger.serviceklage.form.onskersvar.ja",
              })}
              checked={fields.onskerKontakt === true}
              onChange={() => setField({ onskerKontakt: true })}
            />
            <Radio
              label={intl.formatMessage({
                id: "tilbakemeldinger.serviceklage.form.onskersvar.nei",
              })}
              name={intl.formatMessage({
                id: "tilbakemeldinger.serviceklage.form.onskersvar.nei",
              })}
              checked={fields.onskerKontakt === false}
              onChange={() => setField({ onskerKontakt: false })}
            />
            {fields.onskerKontakt && (
              <>
                {fields.hvemFra === "BEDRIFT" && <ServiceKlageKontaktBedrift />}
                <ServiceKlageTelefon />
              </>
            )}
          </SkjemaGruppe>
        );
      }}
    </Validation>
  );
};
export default ServiceKlageOnskerAaKontaktes;
