import React from "react";
import { useIntl } from "react-intl";
import { Validation } from "calidation";
import InputField from "components/input-fields/InputField";

interface Fields {
  klagetypeUtdypning: string;
}

const ServiceKlageTypeUtdypning = () => {
  const intl = useIntl();

  const klagetypeUtdypningFormConfig = {
    klagetypeUtdypning: {
      isRequired: intl.formatMessage({
        id: "validering.klagetype.utdypning.pakrevd",
      }),
    },
  };

  const initialValues: Fields = {
    klagetypeUtdypning: "",
  };

  return (
    <Validation
      key={"klagetype-utdypning"}
      config={klagetypeUtdypningFormConfig}
      initialValues={initialValues}
    >
      {({ errors, fields, submitted, setField }) => {
        return (
          <div className="serviceKlage__ekspandert">
            <InputField
              bredde={"L"}
              label={""}
              value={fields.klagetypeUtdypning}
              error={errors.klagetypeUtdypning}
              onChange={(v) => setField({ klagetypeUtdypning: v })}
              submitted={submitted}
            />
          </div>
        );
      }}
    </Validation>
  );
};
export default ServiceKlageTypeUtdypning;
