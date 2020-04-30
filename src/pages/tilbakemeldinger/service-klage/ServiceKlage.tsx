import React, { useState } from "react";
import VeilederIcon from "assets/Veileder.svg";
import Veilederpanel from "nav-frontend-veilederpanel";
import { useStore } from "providers/Provider";
import { Knapp } from "nav-frontend-knapper";
import { Link } from "react-router-dom";
import { postServiceKlage } from "clients/apiClient";
import { AlertStripeFeil, AlertStripeInfo } from "nav-frontend-alertstriper";
import NavFrontendSpinner from "nav-frontend-spinner";
import { HTTPError } from "components/error/Error";
import { FormContext, Form, Validation } from "calidation";
import InputMelding from "components/input-fields/InputMelding";
import {
  ON_BEHALF_OF,
  OutboundServiceKlageBase,
  OutboundServiceKlageExtend
} from "types/serviceklage";
import Header from "components/header/Header";
import { useLocalePaths } from "Config";
import Box from "components/box/Box";
import { Checkbox, Radio, SkjemaGruppe } from "nav-frontend-skjema";
import { FormattedHTMLMessage, FormattedMessage, useIntl } from "react-intl";
import ServiceKlagePrivatperson from "./ServiceKlagePrivatperson";
import ServiceKlageForAnnenPerson from "./ServiceKlageAnnenPerson";
import ServiceKlageForBedrift from "./ServiceKlageBedrift";
import ServiceKlageGjelderSosialhjelp from "./ServiceKlageGjelderSosialhjelp";
import Takk from "components/takk/Takk";
import { sjekkForFeil } from "utils/validators";
import { triggerHotjar } from "utils/hotjar";
import ServiceKlageOnskerAaKontaktes from "./ServiceKlageOnskerAaKontaktes";
import Topplinje from "../../../components/topp-linje/ToppLinje";
import ServiceKlageTypeUtdypning from "./ServiceKlageTypeUtdypning";
import { MetaTags } from "../../../components/metatags/MetaTags";

export type OutboundServiceKlage = OutboundServiceKlageBase &
  OutboundServiceKlageExtend;

const ServiceKlage = () => {
  const [{ auth }] = useStore();
  const [loading, settLoading] = useState(false);
  const [success, settSuccess] = useState(false);
  const [error, settError] = useState();
  const intl = useIntl();
  const paths = useLocalePaths();

  const baseFormConfig = {
    klagetyper: {
      isRequired: intl.formatMessage({ id: "validering.klagetyper.pakrevd" }),
      isValidFeiltyper: intl.formatMessage({ id: "validering.klagetyper.velg" })
    },
    hvemFra: {
      isRequired: intl.formatMessage({ id: "validering.hvemfra.pakrevd" })
    },
    melding: {
      isRequired: intl.formatMessage({ id: "validering.melding.pakrevd" }),
      isValidMelding: intl.formatMessage({ id: "validering.melding.tegn" })
    }
  };

  const initialValues = {
    klagetyper: []
  };

  const send = (e: FormContext) => {
    const { isValid, fields } = e;
    const hvemFra: ON_BEHALF_OF = fields.hvemFra;

    if (isValid) {
      const outboundBase: OutboundServiceKlageBase = {
        klagetekst: fields.melding,
        klagetyper: fields.klagetyper,
        klagetypeUtdypning: fields.klagetypeUtdypning,
        oenskerAaKontaktes: fields.onskerKontakt,
        ...(fields.klagetyper.includes("LOKALT_NAV_KONTOR") && {
          gjelderSosialhjelp: fields.gjelderSosialhjelp
        })
      };

      const outboundExtend: {
        [key in ON_BEHALF_OF]: OutboundServiceKlageExtend;
      } = {
        PRIVATPERSON: {
          paaVegneAv: "PRIVATPERSON",
          innmelder: {
            navn: fields.innmelderNavn,
            ...(fields.innmelderTlfnr && {
              telefonnummer: fields.innmelderTlfnr
            }),
            personnummer: fields.innmelderFnr
          }
        },
        ANNEN_PERSON: {
          paaVegneAv: "ANNEN_PERSON",
          innmelder: {
            navn: fields.innmelderNavn,
            ...(fields.innmelderTlfnr && {
              telefonnummer: fields.innmelderTlfnr
            }),
            harFullmakt: fields.innmelderHarFullmakt,
            rolle: fields.innmelderRolle
          },
          paaVegneAvPerson: {
            navn: fields.paaVegneAvNavn,
            personnummer: fields.paaVegneAvFodselsnr
          }
        },
        BEDRIFT: {
          paaVegneAv: "BEDRIFT",
          ...(fields.enhetsnummerPaaklaget && {
            enhetsnummerPaaklaget: fields.enhetsnummerPaaklaget.value
          }),
          innmelder: {
            ...(fields.onskerKontakt && {
              navn: fields.innmelderNavn,
              telefonnummer: fields.innmelderTlfnr
            }),
            ...(fields.innmelderRolle && {
              rolle: fields.innmelderRolle
            })
          },
          paaVegneAvBedrift: {
            navn: fields.orgNavn,
            organisasjonsnummer: fields.orgNummer
          }
        }
      };

      const outbound = {
        ...outboundBase,
        ...outboundExtend[hvemFra]
      };

      settLoading(true);
      postServiceKlage(outbound)
        .then(() => {
          settSuccess(true);
          triggerHotjar("serviceklage");
        })
        .catch((error: HTTPError) => {
          settError(`${error.code} - ${error.text}`);
        })
        .then(() => {
          settLoading(false);
        });
    }
  };

  const tilbakeTil = auth.authenticated
    ? paths.tilbakemeldinger.forside
    : paths.tilbakemeldinger.serviceklage.login;

  return (
    <div className="pagecontent">
      <Topplinje />
      <MetaTags
        titleId={"tilbakemeldinger.serviceklage.form.tittel"}
        descriptionId={"seo.klagepaservice.description"}
        path={paths.tilbakemeldinger.serviceklage.form}
      />
      <Header
        title={intl.formatMessage({
          id: "tilbakemeldinger.serviceklage.form.tittel"
        })}
      />
      <div className={"tb__veileder"}>
        <Veilederpanel
          svg={<img src={VeilederIcon} alt="Veileder" />}
          type={"plakat"}
          kompakt={true}
        >
          <div className={"tb__veileder-container"}>
            <FormattedHTMLMessage id="tilbakemeldinger.serviceklage.form.veileder" />
          </div>
        </Veilederpanel>
      </div>
      <Box>
        {success ? (
          <Takk />
        ) : (
          <Form onSubmit={send}>
            <Validation config={baseFormConfig} initialValues={initialValues}>
              {({ errors, fields, submitted, setField, isValid }) => {
                const hvemFra: ON_BEHALF_OF = fields.hvemFra;
                const { innmelderHarFullmakt } = fields;
                const kanOnskeAaKontaktes =
                  hvemFra !== "ANNEN_PERSON" || innmelderHarFullmakt !== false;

                const toggleklagetyper = (value: string) => {
                  if (fields.klagetyper.includes(value)) {
                    setField({
                      klagetyper: fields.klagetyper.filter(
                        (v: string) => v !== value
                      )
                    });
                  } else {
                    setField({
                      klagetyper: fields.klagetyper.concat([value])
                    });
                  }
                };

                return (
                  <div className="skjema__content">
                    <SkjemaGruppe
                      legend={intl.formatMessage({ id: "felter.klagetyper" })}
                      feil={sjekkForFeil(submitted, errors.klagetyper)}
                    >
                      <div className={"felter__melding-advarsel"}>
                        <AlertStripeInfo>
                          <FormattedMessage id={"felter.klagetyper.info"} />
                        </AlertStripeInfo>
                      </div>
                      <Checkbox
                        label={intl.formatMessage({
                          id: "felter.klagetyper.telefon"
                        })}
                        name={"TELEFON"}
                        checked={fields.klagetyper.includes("TELEFON")}
                        onChange={() => toggleklagetyper("TELEFON")}
                      />
                      <Checkbox
                        label={intl.formatMessage({
                          id: "felter.klagetyper.navkontor"
                        })}
                        name={"LOKALT_NAV_KONTOR"}
                        checked={fields.klagetyper.includes(
                          "LOKALT_NAV_KONTOR"
                        )}
                        onChange={() => toggleklagetyper("LOKALT_NAV_KONTOR")}
                      />
                      <Checkbox
                        label={intl.formatMessage({
                          id: "felter.klagetyper.digitaletjenester"
                        })}
                        name={"NAV_DIGITALE_TJENESTER"}
                        checked={fields.klagetyper.includes(
                          "NAV_DIGITALE_TJENESTER"
                        )}
                        onChange={() =>
                          toggleklagetyper("NAV_DIGITALE_TJENESTER")
                        }
                      />
                      <Checkbox
                        label={intl.formatMessage({
                          id: "felter.klagetyper.brev"
                        })}
                        name={"BREV"}
                        checked={fields.klagetyper.includes("BREV")}
                        onChange={() => toggleklagetyper("BREV")}
                      />
                      <Checkbox
                        label={intl.formatMessage({
                          id: "felter.klagetyper.annet"
                        })}
                        name={"ANNET"}
                        checked={fields.klagetyper.includes("ANNET")}
                        onChange={() => toggleklagetyper("ANNET")}
                      />
                      {fields.klagetyper.includes("ANNET") && (
                        <ServiceKlageTypeUtdypning />
                      )}
                    </SkjemaGruppe>
                    {fields.klagetyper.includes("LOKALT_NAV_KONTOR") && (
                      <ServiceKlageGjelderSosialhjelp />
                    )}
                    <SkjemaGruppe
                      legend={intl.formatMessage({ id: "felter.hvemfra" })}
                      feil={sjekkForFeil(submitted, errors.hvemFra)}
                    >
                      <Radio
                        label={intl.formatMessage({
                          id: "felter.hvemfra.megselv"
                        })}
                        name={"PRIVATPERSON"}
                        checked={fields.hvemFra === "PRIVATPERSON"}
                        onChange={() => setField({ hvemFra: "PRIVATPERSON" })}
                      />
                      <Radio
                        label={intl.formatMessage({
                          id: "felter.hvemfra.enannen"
                        })}
                        name={"ANNEN_PERSON"}
                        checked={fields.hvemFra === "ANNEN_PERSON"}
                        onChange={() => setField({ hvemFra: "ANNEN_PERSON" })}
                      />
                      <Radio
                        label={intl.formatMessage({
                          id: "felter.hvemfra.virksomhet"
                        })}
                        name={"BEDRIFT"}
                        checked={fields.hvemFra === "BEDRIFT"}
                        onChange={() => setField({ hvemFra: "BEDRIFT" })}
                      />
                      {hvemFra === "PRIVATPERSON" && (
                        <ServiceKlagePrivatperson />
                      )}
                      {hvemFra === "ANNEN_PERSON" && (
                        <ServiceKlageForAnnenPerson />
                      )}
                      {hvemFra === "BEDRIFT" && <ServiceKlageForBedrift />}
                    </SkjemaGruppe>
                    <div className="serviceKlage__melding">
                      <InputMelding
                        label={intl.formatMessage({
                          id: "felter.melding.tittel"
                        })}
                        submitted={submitted}
                        value={fields.melding}
                        error={errors.melding}
                        onChange={v => setField({ melding: v })}
                      />
                    </div>
                    {kanOnskeAaKontaktes && <ServiceKlageOnskerAaKontaktes />}
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
                        <Link to={tilbakeTil}>
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

export default ServiceKlage;
