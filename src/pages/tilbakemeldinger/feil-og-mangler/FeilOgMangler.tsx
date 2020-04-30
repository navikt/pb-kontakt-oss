import React, { useState } from "react";
import Veilederpanel from "nav-frontend-veilederpanel";
import VeilederIcon from "assets/Veileder.svg";
import { Knapp } from "nav-frontend-knapper";
import { Link, withRouter } from "react-router-dom";
import InputMelding from "components/input-fields/InputMelding";
import { postFeilOgMangler } from "clients/apiClient";
import { HTTPError } from "components/error/Error";
import { AlertStripeFeil } from "nav-frontend-alertstriper";
import NavFrontendSpinner from "nav-frontend-spinner";
import { FormContext, FormValidation } from "calidation";
import Header from "components/header/Header";
import { useLocalePaths } from "Config";
import Box from "components/box/Box";
import { Radio, SkjemaGruppe } from "nav-frontend-skjema";
import { FormattedHTMLMessage, FormattedMessage, useIntl } from "react-intl";
import Takk from "components/takk/Takk";
import { sjekkForFeil } from "utils/validators";
import FeilgOgManglerOnskerAaKontaktes from "./FeilOgManglerOnskerAaKontaktes";
import Topplinje from "../../../components/topp-linje/ToppLinje";
import { triggerHotjar } from "../../../utils/hotjar";
import { MetaTags } from "../../../components/metatags/MetaTags";

export interface OutboundFeilOgMangler {
  onskerKontakt: boolean;
  epost?: string;
  feiltype: "TEKNISK_FEIL" | "FEIL_INFO" | "UNIVERSELL_UTFORMING";
  melding: string;
}

const FOM = () => {
  const [loading, settLoading] = useState(false);
  const [success, settSuccess] = useState(false);
  const [error, settError] = useState();
  const intl = useIntl();
  const paths = useLocalePaths();

  const formConfig = {
    feiltype: {
      isRequired: intl.formatMessage({
        id: "validering.feiltype.pakrevd"
      })
    },
    melding: {
      isRequired: intl.formatMessage({
        id: "validering.melding.pakrevd"
      }),
      isValidMelding: intl.formatMessage({ id: "validering.melding.tegn" })
    }
  };

  const send = (e: FormContext) => {
    const { isValid, fields } = e;
    const { onskerKontakt, feiltype, melding } = fields;
    const { epost } = fields;

    if (isValid) {
      const outbound = {
        feiltype,
        onskerKontakt,
        ...(onskerKontakt && {
          epost
        }),
        melding
      };

      settLoading(true);
      postFeilOgMangler(outbound)
        .then(() => {
          settSuccess(true);
          triggerHotjar("feilogmangler");
        })
        .catch((error: HTTPError) => {
          settError(`${error.code} - ${error.text}`);
        })
        .then(() => {
          settLoading(false);
        });
    }
  };

  return (
    <div className="pagecontent">
      <Topplinje />
      <MetaTags
        titleId={"tilbakemeldinger.feilogmangler.tittel"}
        descriptionId={"seo.feilogmangler.description"}
        path={paths.tilbakemeldinger.feilogmangler}
      />
      <Header
        title={intl.formatMessage({
          id: "tilbakemeldinger.feilogmangler.form.tittel"
        })}
      />
      <div className={"tb__veileder"}>
        <Veilederpanel
          svg={<img src={VeilederIcon} alt="Veileder" />}
          type={"plakat"}
          kompakt={true}
        >
          <div className={"tb__veileder-container"}>
            <FormattedHTMLMessage
              id={"tilbakemeldinger.feilogmangler.form.veileder"}
            />
          </div>
        </Veilederpanel>
      </div>
      <Box>
        {success ? (
          <Takk />
        ) : (
          <FormValidation onSubmit={send} config={formConfig}>
            {({ errors, fields, submitted, setField, isValid }) => (
              <div className={"skjema__content"}>
                <SkjemaGruppe
                  legend={intl.formatMessage({
                    id: "felter.typefeil.tittel"
                  })}
                  feil={sjekkForFeil(submitted, errors.feiltype)}
                >
                  <Radio
                    label={intl.formatMessage({
                      id: "felter.typefeil.tekniskfeil"
                    })}
                    name={"TEKNISK_FEIL"}
                    checked={fields.feiltype === "TEKNISK_FEIL"}
                    onChange={() => setField({ feiltype: "TEKNISK_FEIL" })}
                  />
                  <Radio
                    label={intl.formatMessage({
                      id: "felter.typefeil.feilinformasjon"
                    })}
                    name={"FEIL_INFO"}
                    checked={fields.feiltype === "FEIL_INFO"}
                    onChange={() => setField({ feiltype: "FEIL_INFO" })}
                  />
                  <Radio
                    label={intl.formatMessage({
                      id: "felter.typefeil.uu"
                    })}
                    name={"UNIVERSELL_UTFORMING"}
                    checked={fields.feiltype === "UNIVERSELL_UTFORMING"}
                    onChange={() =>
                      setField({ feiltype: "UNIVERSELL_UTFORMING" })
                    }
                  />
                </SkjemaGruppe>
                <InputMelding
                  label={intl.formatMessage({
                    id: "felter.melding.tittel"
                  })}
                  submitted={submitted}
                  value={fields.melding}
                  error={errors.melding}
                  onChange={v => setField({ melding: v })}
                />
                <FeilgOgManglerOnskerAaKontaktes />
                {error && (
                  <AlertStripeFeil className={"felter__melding-advarsel"}>
                    <FormattedMessage id={"felter.noegikkgalt"} /> {error}
                  </AlertStripeFeil>
                )}
                <div className="tb__knapper">
                  <div className="tb__knapp">
                    <Knapp
                      htmlType={"submit"}
                      type={"standard"}
                      disabled={loading || (submitted && !isValid)}
                    >
                      {loading ? (
                        <NavFrontendSpinner type={"S"} />
                      ) : (
                        <FormattedMessage id={"felter.send"} />
                      )}
                    </Knapp>
                  </div>
                  <div className="tb__knapp">
                    <Link to={paths.tilbakemeldinger.forside}>
                      <Knapp type={"flat"}>
                        <FormattedMessage id={"felter.tilbake"} />
                      </Knapp>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </FormValidation>
        )}
      </Box>
    </div>
  );
};
export default withRouter(FOM);
