import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Validation } from "calidation";
import { useStore } from "providers/Provider";
import InputField from "components/input-fields/InputField";
import { AlertStripeInfo } from "nav-frontend-alertstriper";

const FeilOgManglerEpost = () => {
  const intl = useIntl();
  const [{ kontaktInfo }] = useStore();

  const initialValues = {
    epost: kontaktInfo.epostadresse || "",
  };

  const epostConfig = {
    epost: {
      isRequired: intl.formatMessage({
        id: "validering.epost.pakrevd",
      }),
      isEmail: intl.formatMessage({
        id: "validering.epost.gyldig",
      }),
    },
  };

  return (
    <Validation
      key={"epost"}
      config={epostConfig}
      initialValues={initialValues}
    >
      {({ errors, fields, submitted, setField }) => {
        return (
          <div className="serviceKlage__ekspandert">
            <InputField
              bredde={"L"}
              label={intl.formatMessage({ id: "felter.epost.tittel" })}
              value={fields.epost}
              error={errors.epost}
              onChange={(v) => setField({ epost: v })}
              submitted={submitted}
            />
            <div className="tilbakemeldinger__svartid">
              <AlertStripeInfo>
                <FormattedMessage
                  id={"tilbakemeldinger.feilogmangler.svartid"}
                />
              </AlertStripeInfo>
            </div>
          </div>
        );
      }}
    </Validation>
  );
};
export default FeilOgManglerEpost;
