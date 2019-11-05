import React from "react";
import { useIntl } from "react-intl";
import { Validation } from "calidation";
import InputTelefon from "components/input-fields/InputTelefon";
import InputField from "../../../components/input-fields/InputField";

const FeilOgManglerEpost = () => {
  const intl = useIntl();
  const epostConfig = {
    epost: {
      isRequired: intl.formatMessage({
        id: "validering.epost.pakrevd"
      }),
      isEmail: intl.formatMessage({
        id: "validering.epost.gyldig"
      })
    }
  };

  return (
    <Validation key={"epost"} config={epostConfig}>
      {({ errors, fields, submitted, setField }) => {
        return (
          <div className="serviceKlage__ekspandert">
            <InputField
              bredde={"L"}
              label={intl.formatMessage({ id: "felter.epost.tittel" })}
              value={fields.epost}
              error={errors.epost}
              onChange={v => setField({ epost: v })}
              submitted={submitted}
            />
          </div>
        );
      }}
    </Validation>
  );
};
export default FeilOgManglerEpost;
