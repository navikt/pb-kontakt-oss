import React, { useState } from "react";
import Veilederpanel from "nav-frontend-veilederpanel";
import VeilederIcon from "assets/Veileder.svg";
import { Knapp } from "nav-frontend-knapper";
import { Link } from "react-router-dom";
import InputMelding from "components/input-fields/InputMelding";
import { postRosTilNav } from "clients/apiClient";
import { HTTPError } from "components/error/Error";
import { AlertStripeFeil } from "nav-frontend-alertstriper";
import NavFrontendSpinner from "nav-frontend-spinner";
import { FormContext, Form, Validation } from "calidation";
import { ValueType } from "react-select/src/types";
import Header from "components/header/Header";
import { useLocalePaths } from "Config";
import Box from "components/box/Box";
import { Radio, SkjemaGruppe } from "nav-frontend-skjema";
import { FormattedHTMLMessage, FormattedMessage, useIntl } from "react-intl";
import Takk from "components/takk/Takk";
import { sjekkForFeil } from "utils/validators";
import { triggerHotjar } from "utils/hotjar";
import Topplinje from "components/topp-linje/ToppLinje";
import SelectEnhet from "components/input-fields/SelectEnhet";
import { MetaTags } from "../../../components/metatags/MetaTags";

type HVEM_ROSES = "NAV_KONTAKTSENTER" | "NAV_DIGITALE_TJENESTER" | "NAV_KONTOR";

type OutboundRosTilNavBase = {
  melding: string;
};

type OutboundRosTilNavExtend =
  | { hvemRoses: "NAV_KONTAKTSENTER" }
  | { hvemRoses: "NAV_DIGITALE_TJENESTER" }
  | { hvemRoses: "NAV_KONTOR"; navKontor: string };

export type OutboundRosTilNav = OutboundRosTilNavBase & OutboundRosTilNavExtend;
const Ros = () => {
  const [loading, settLoading] = useState(false);
  const [success, settSuccess] = useState(false);
  const [error, settError] = useState();
  const intl = useIntl();
  const paths = useLocalePaths();

  const formConfig = {
    navn: {},
    hvemRoses: {
      isRequired: intl.formatMessage({
        id: "validering.hvemroses.pakrevd"
      })
    },
    melding: {
      isRequired: intl.formatMessage({
        id: "validering.melding.pakrevd"
      }),
      isValidMelding: intl.formatMessage({ id: "validering.melding.tegn" })
    }
  };

  const navKontorConfig = {
    navKontor: {
      isRequired: intl.formatMessage({
        id: "validering.navkontor.pakrevd"
      })
    }
  };

  const send = (e: FormContext) => {
    const { isValid, fields } = e;
    const { navn, melding } = fields;
    const hvemRoses: HVEM_ROSES = fields.hvemRoses;

    if (isValid) {
      const outboundBase = {
        ...(navn && {
          navn
        }),
        melding
      };

      const outboundExtend: {
        [key in HVEM_ROSES]: OutboundRosTilNavExtend;
      } = {
        NAV_KONTAKTSENTER: { hvemRoses: "NAV_KONTAKTSENTER" },
        NAV_DIGITALE_TJENESTER: { hvemRoses: "NAV_DIGITALE_TJENESTER" },
        NAV_KONTOR: {
          hvemRoses: "NAV_KONTOR",
          navKontor: fields.navKontor ? fields.navKontor.label : undefined
        }
      };

      const outbound = {
        ...outboundBase,
        ...outboundExtend[hvemRoses]
      };

      settLoading(true);
      postRosTilNav(outbound)
        .then(() => {
          settSuccess(true);
          triggerHotjar("rosnav");
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
        titleId={"tilbakemeldinger.ros.tittel"}
        descriptionId={"seo.rostilnav.description"}
        path={paths.tilbakemeldinger.rostilnav}
      />
      <Header
        title={intl.formatMessage({ id: "tilbakemeldinger.ros.form.tittel" })}
      />
      <div className={"tb__veileder"}>
        <Veilederpanel
          svg={<img src={VeilederIcon} alt="Veileder" />}
          type={"plakat"}
          kompakt={true}
        >
          <div className={"tb__veileder-container"}>
            <FormattedHTMLMessage id={"tilbakemeldinger.ros.form.veileder"} />
          </div>
        </Veilederpanel>
      </div>
      <Box>
        {success ? (
          <Takk />
        ) : (
          <Form onSubmit={send}>
            <Validation config={formConfig}>
              {({ errors, fields, submitted, setField, isValid }) => {
                return (
                  <div className={"skjema__content"}>
                    <SkjemaGruppe
                      legend={intl.formatMessage({
                        id: "felter.hvemroses.tittel"
                      })}
                      feil={sjekkForFeil(submitted, errors.hvemRoses)}
                    >
                      <Radio
                        label={intl.formatMessage({
                          id: "felter.hvemroses.navkontaktsenter"
                        })}
                        name={"NAV_KONTAKTSENTER"}
                        checked={fields.hvemRoses === "NAV_KONTAKTSENTER"}
                        onChange={() =>
                          setField({ hvemRoses: "NAV_KONTAKTSENTER" })
                        }
                      />
                      <Radio
                        label={intl.formatMessage({
                          id: "felter.hvemroses.digitaletjenester"
                        })}
                        name={"NAV_DIGITALE_TJENESTER"}
                        checked={fields.hvemRoses === "NAV_DIGITALE_TJENESTER"}
                        onChange={() =>
                          setField({ hvemRoses: "NAV_DIGITALE_TJENESTER" })
                        }
                      />
                      <Radio
                        label={intl.formatMessage({
                          id: "felter.hvemroses.navkontor"
                        })}
                        name={"NAV_KONTOR"}
                        checked={fields.hvemRoses === "NAV_KONTOR"}
                        onChange={() => setField({ hvemRoses: "NAV_KONTOR" })}
                      />
                      {fields.hvemRoses === "NAV_KONTOR" && (
                        <Validation config={navKontorConfig}>
                          {() => (
                            <SelectEnhet
                              label={"felter.hvemroses.navkontor.velg"}
                              error={errors.navKontor}
                              submitted={submitted}
                              value={fields.navKontor}
                              onChange={(
                                v: ValueType<{
                                  value: string;
                                  label: string;
                                }>
                              ) => setField({ navKontor: v })}
                            />
                          )}
                        </Validation>
                      )}
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
                );
              }}
            </Validation>
          </Form>
        )}
      </Box>
    </div>
  );
};
export default Ros;
