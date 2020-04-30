import React from "react";
import { FormattedHTMLMessage, useIntl } from "react-intl";
import { Validation } from "calidation";
import InputNavn from "components/input-fields/InputNavn";
import InputField from "components/input-fields/InputField";
import { AlertStripeAdvarsel } from "nav-frontend-alertstriper";
import { sjekkForFeil } from "utils/validators";
import { Radio, SkjemaGruppe } from "nav-frontend-skjema";
import { urls } from "../../../Config";

const ServiceKlageForAnnenPerson = () => {
  const intl = useIntl();
  const annenPersFormConfig = {
    innmelderNavn: {
      isRequired: intl.formatMessage({ id: "validering.navn.pakrevd" })
    },
    paaVegneAvNavn: {
      isRequired: intl.formatMessage({ id: "validering.navn.pakrevd" })
    },
    paaVegneAvFodselsnr: {
      isRequired: intl.formatMessage({ id: "validering.fodselsnr.pakrevd" }),
      isNumber: intl.formatMessage({ id: "validering.fodselsnr.siffer" }),
      isExactLength: {
        message: intl.formatMessage({
          id: "validering.fodselsnr.korrektsiffer"
        }),
        length: 11
      }
    },
    innmelderHarFullmakt: {
      isRequired: intl.formatMessage({ id: "validering.fullmakt.pakrevd" })
    },
    innmelderRolle: {
      isRequired: intl.formatMessage({ id: "validering.rolle.pakrevd" })
    }
  };

  return (
    <Validation key={"annenPers"} config={annenPersFormConfig}>
      {({ errors, fields, submitted, setField }) => {
        return (
          <div className="serviceKlage__ekspandert">
            <InputNavn
              bredde={"L"}
              label={intl.formatMessage({ id: "felter.dittnavn" })}
              submitted={submitted}
              value={fields.innmelderNavn}
              error={errors.innmelderNavn}
              onChange={v => setField({ innmelderNavn: v })}
            />
            <InputField
              bredde={"M"}
              submitted={submitted}
              label={intl.formatMessage({ id: "felter.dinrolle.annenperson" })}
              required={true}
              value={fields.innmelderRolle}
              error={errors.innmelderRolle}
              onChange={v => setField({ innmelderRolle: v })}
            />
            <InputField
              bredde={"L"}
              label={intl.formatMessage({ id: "felter.navntilklager" })}
              submitted={submitted}
              value={fields.paaVegneAvNavn}
              error={errors.paaVegneAvNavn}
              onChange={v => setField({ paaVegneAvNavn: v })}
            />
            <InputField
              bredde={"S"}
              label={intl.formatMessage({ id: "felter.fodselsnrtilklager" })}
              submitted={submitted}
              value={fields.paaVegneAvFodselsnr}
              error={errors.paaVegneAvFodselsnr}
              onChange={v => setField({ paaVegneAvFodselsnr: v })}
            />
            <SkjemaGruppe
              legend={intl.formatMessage({
                id: "felter.fullmakt"
              })}
              feil={sjekkForFeil(submitted, errors.innmelderHarFullmakt)}
            >
              <Radio
                label={intl.formatMessage({
                  id: "felter.fullmakt.ja"
                })}
                name={intl.formatMessage({
                  id: "felter.fullmakt.ja"
                })}
                checked={fields.innmelderHarFullmakt === true}
                onChange={() => setField({ innmelderHarFullmakt: true })}
              />
              <Radio
                label={intl.formatMessage({
                  id: "felter.fullmakt.nei"
                })}
                name={intl.formatMessage({
                  id: "felter.fullmakt.nei"
                })}
                checked={fields.innmelderHarFullmakt === false}
                onChange={() => setField({ innmelderHarFullmakt: false })}
              />
              {fields.innmelderHarFullmakt === false && (
                <AlertStripeAdvarsel>
                  <FormattedHTMLMessage
                    id={"felter.fullmakt.advarsel"}
                    values={
                      { fullmaktskjema: urls.tilbakemeldinger.serviceklage.fullmaktskjema }
                    }
                  />
                </AlertStripeAdvarsel>
              )}
            </SkjemaGruppe>
          </div>
        );
      }}
    </Validation>
  );
};
export default ServiceKlageForAnnenPerson;
