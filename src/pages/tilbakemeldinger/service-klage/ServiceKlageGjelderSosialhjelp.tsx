import React from "react";
import { Validation } from "calidation";
import { useIntl } from "react-intl";
import { Radio, SkjemaGruppe } from "nav-frontend-skjema";
import { sjekkForFeil } from "../../../utils/validators";

interface Fields {
  gjelderSosialhjelp: string;
}

const ServiceKlageGjelderSosialhjelp = () => {
  const intl = useIntl();
  const ytelseTjenesteFormConfig = {
    gjelderSosialhjelp: {
      isRequired: intl.formatMessage({
        id: "validering.gjeldersosialhjelp.pakrevd",
      }),
    },
  };

  const initialValues: Fields = {
    gjelderSosialhjelp: "",
  };

  return (
    <Validation
      key={"ytelse"}
      config={ytelseTjenesteFormConfig}
      initialValues={initialValues}
    >
      {({ errors, fields, submitted, setField }) => {
        return (
          <div className="serviceKlage__ekspandert">
            <SkjemaGruppe
              legend={intl.formatMessage({
                id: "felter.gjeldersosialhjelp",
              })}
              feil={sjekkForFeil(submitted, errors.gjelderSosialhjelp)}
            >
              <Radio
                label={intl.formatMessage({
                  id: "felter.gjeldersosialhjelp.ja",
                })}
                name={intl.formatMessage({
                  id: "felter.gjeldersosialhjelp.ja",
                })}
                checked={fields.gjelderSosialhjelp === "JA"}
                onChange={() => setField({ gjelderSosialhjelp: "JA" })}
              />
              <Radio
                label={intl.formatMessage({
                  id: "felter.gjeldersosialhjelp.nei",
                })}
                name={intl.formatMessage({
                  id: "felter.gjeldersosialhjelp.nei",
                })}
                checked={fields.gjelderSosialhjelp === "NEI"}
                onChange={() => setField({ gjelderSosialhjelp: "NEI" })}
              />
              <Radio
                label={intl.formatMessage({
                  id: "felter.gjeldersosialhjelp.vetikke",
                })}
                name={intl.formatMessage({
                  id: "felter.gjeldersosialhjelp.vetikke",
                })}
                checked={fields.gjelderSosialhjelp === "VET_IKKE"}
                onChange={() => setField({ gjelderSosialhjelp: "VET_IKKE" })}
              />
            </SkjemaGruppe>
          </div>
        );
      }}
    </Validation>
  );
};
export default ServiceKlageGjelderSosialhjelp;
