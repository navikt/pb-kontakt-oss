import React from "react";
import { useIntl } from "react-intl";
import { Validation } from "calidation";
import InputField from "components/input-fields/InputField";
import { useStore } from "providers/Provider";

const ServiceKlageTelefon = () => {
  const intl = useIntl();
  const [{ kontaktInfo }] = useStore();

  const initialValues = {
    innmelderTlfnr: kontaktInfo.mobiltelefonnummer || "",
  };

  const tlfFormConfig = {
    innmelderTlfnr: {
      isRequired: intl.formatMessage({ id: "validering.tlf.pakrevd" }),
    },
  };

  return (
    <Validation
      key={"tlf"}
      config={tlfFormConfig}
      initialValues={initialValues}
    >
      {({ errors, fields, submitted, setField }) => {
        return (
          <div className="serviceKlage__ekspandert">
            <InputField
              bredde={"S"}
              label={intl.formatMessage({ id: "felter.tlf.tittel" })}
              value={fields.innmelderTlfnr}
              error={errors.innmelderTlfnr}
              onChange={(v) => setField({ innmelderTlfnr: v })}
              submitted={submitted}
            />
          </div>
        );
      }}
    </Validation>
  );
};
export default ServiceKlageTelefon;
