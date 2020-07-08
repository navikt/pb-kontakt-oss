import React from "react";
import { useIntl } from "react-intl";
import { Validation } from "calidation";
import InputNavn from "../../../components/input-fields/InputNavn";

interface Fields {
  innmelderNavn: string;
}

const ServiceKlageKontaktBedrift = () => {
  const intl = useIntl();
  const kontaktBedrift = {
    innmelderNavn: {
      isRequired: intl.formatMessage({ id: "validering.navn.pakrevd" }),
    },
  };

  const initialValues: Fields = {
    innmelderNavn: "",
  };

  return (
    <Validation
      key={"kontakt-bedrift"}
      config={kontaktBedrift}
      initialValues={initialValues}
    >
      {({ errors, fields, submitted, setField }) => {
        return (
          <div className="serviceKlage__ekspandert">
            <InputNavn
              bredde={"M"}
              label={intl.formatMessage({ id: "felter.dittnavn" })}
              submitted={submitted}
              value={fields.innmelderNavn}
              error={errors.innmelderNavn}
              onChange={(v) => setField({ innmelderNavn: v })}
            />
          </div>
        );
      }}
    </Validation>
  );
};
export default ServiceKlageKontaktBedrift;
