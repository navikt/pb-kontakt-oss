import React from "react";
import { useIntl } from "react-intl";
import { Validation } from "calidation";
import InputField from "components/input-fields/InputField";
import SelectEnhet from "../../../components/input-fields/SelectEnhet";
import { ValueType } from "react-select/src/types";

interface Fields {
  innmelderRolle: string;
  orgNavn: string;
  orgNummer: string;
  enhetsnummerPaaklaget?: ValueType<{
    value: string;
    label: string;
  }>;
}

const ServiceKlageForBedrift = () => {
  const intl = useIntl();
  const bedriftFormConfig = {
    innmelderRolle: {},
    orgNavn: {
      isRequired: intl.formatMessage({ id: "validering.orgnavn.pakrevd" }),
    },
    orgNummer: {
      isRequired: intl.formatMessage({ id: "validering.orgnr.pakrevd" }),
      isNumber: intl.formatMessage({ id: "validering.orgnr.siffer" }),
      isExactLength: {
        message: intl.formatMessage({ id: "validering.orgnr.korrektsiffer" }),
        length: 9,
      },
    },
    enhetsnummerPaaklaget: {
      isRequired: intl.formatMessage({
        id: "validering.navkontor.pakrevd",
      }),
    },
  };

  const initialValues: Fields = {
    innmelderRolle: "",
    orgNavn: "",
    orgNummer: "",
    enhetsnummerPaaklaget: undefined,
  };

  return (
    <Validation
      key={"bedrift"}
      config={bedriftFormConfig}
      initialValues={initialValues}
    >
      {({ errors, fields, submitted, setField }) => {
        return (
          <div className="serviceKlage__ekspandert">
            <InputField
              bredde={"M"}
              label={intl.formatMessage({ id: "felter.dinrolle.bedrift" })}
              submitted={submitted}
              value={fields.innmelderRolle}
              error={errors.innmelderRolle}
              onChange={(v) => setField({ innmelderRolle: v })}
            />
            <InputField
              bredde={"M"}
              label={intl.formatMessage({ id: "felter.orgnavn" })}
              submitted={submitted}
              value={fields.orgNavn}
              error={errors.orgNavn}
              onChange={(v) => setField({ orgNavn: v })}
            />
            <InputField
              bredde={"M"}
              label={intl.formatMessage({ id: "felter.orgnr" })}
              submitted={submitted}
              value={fields.orgNummer}
              error={errors.orgNummer}
              onChange={(v) => setField({ orgNummer: v })}
            />
            <SelectEnhet
              label={"felter.klagerpa.navkontor.velg"}
              error={errors.enhetsnummerPaaklaget}
              submitted={submitted}
              value={fields.enhetsnummerPaaklaget}
              onChange={(
                v: ValueType<{
                  value: string;
                  label: string;
                }>
              ) => setField({ enhetsnummerPaaklaget: v })}
            />
          </div>
        );
      }}
    </Validation>
  );
};
export default ServiceKlageForBedrift;
