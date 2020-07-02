import React from "react";
import { useIntl } from "react-intl";
import { Validation } from "calidation";
import InputNavn from "components/input-fields/InputNavn";
import InputFodselsnr from "components/input-fields/InputFodselsnr";

const ServiceKlagePrivatperson = () => {
  const intl = useIntl();
  const initialValues = {} as any;

  const privPersFormConfig = {
    innmelderNavn: {
      isRequired: intl.formatMessage({ id: "validering.navn.pakrevd" }),
    },
    innmelderFnr: {
      isRequired: intl.formatMessage({ id: "validering.fodselsnr.pakrevd" }),
      isNumber: intl.formatMessage({ id: "validering.fodselsnr.siffer" }),
      isExactLength: {
        message: intl.formatMessage({
          id: "validering.fodselsnr.korrektsiffer",
        }),
        length: 11,
      },
    },
  };
  return (
    <Validation
      key={"privPers"}
      config={privPersFormConfig}
      initialValues={initialValues}
    >
      {({ errors, fields, submitted, setField }) => {
        return (
          <div className="serviceKlage__ekspandert">
            <InputNavn
              bredde={"L"}
              label={intl.formatMessage({ id: "felter.navn.tittel" })}
              submitted={submitted}
              value={fields.innmelderNavn}
              error={errors.innmelderNavn}
              onChange={(v) => setField({ innmelderNavn: v })}
            />
            <InputFodselsnr
              bredde={"M"}
              label={intl.formatMessage({ id: "felter.fodselsnr" })}
              submitted={submitted}
              error={errors.innmelderFnr}
              value={fields.innmelderFnr}
              onChange={(v) => setField({ innmelderFnr: v })}
            />
          </div>
        );
      }}
    </Validation>
  );
};
export default ServiceKlagePrivatperson;
