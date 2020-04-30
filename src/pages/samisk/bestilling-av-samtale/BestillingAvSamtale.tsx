import React, { useState } from "react";
import { Knapp } from "nav-frontend-knapper";
import { withRouter } from "react-router-dom";
import { postSamiskBestillSamtale } from "clients/apiClient";
import { HTTPError } from "components/error/Error";
import { AlertStripeFeil } from "nav-frontend-alertstriper";
import NavFrontendSpinner from "nav-frontend-spinner";
import { FormContext, FormValidation } from "calidation";
import { Normaltekst, Sidetittel } from "nav-frontend-typografi";
import { Checkbox, SkjemaGruppe } from "nav-frontend-skjema";
import Box from "components/box/Box";
import InputField from "components/input-fields/InputField";
import Takk from "components/takk/Takk";
import { sjekkForFeil } from "utils/validators";
import { FormattedMessage } from "react-intl";
import Veilederpanel from "nav-frontend-veilederpanel";
import VeilederIcon from "assets/Veileder.svg";
import Topplinje from "../../../components/topp-linje/ToppLinje";
import { useStore } from "../../../providers/Provider";

type TIDSROM = "FORMIDDAG" | "ETTERMIDDAG" | "BEGGE";
export interface OutboundBestillingAvSamtale {
  fornavn: string;
  etternavn: string;
  telefonnummer: string;
  tidsrom: TIDSROM;
}

const BAS = () => {
  document.title = "Bestilling av samtale - www.nav.no";
  const [{ kontaktInfo }] = useStore();
  const [loading, settLoading] = useState(false);
  const [success, settSuccess] = useState(false);
  const [error, settError] = useState();

  const formConfig = {
    fornavn: {
      isRequired: "Čále ovdanama"
    },
    etternavn: {
      isRequired: "Čále goarggu"
    },
    telefonnummer: {
      isRequired: "Čále telefon-nummara"
    },
    tidsrom: {
      isRequired: "Vállje áiggi goas heive",
      isValidTidsrom: "Vállje áiggi goas heive"
    }
  };

  const initialValues = {
    ...(kontaktInfo.mobiltelefonnummer && {
      telefonnummer: kontaktInfo.mobiltelefonnummer
    }),
    tidsrom: {
      FORMIDDAG: false,
      ETTERMIDDAG: false
    }
  };

  const send = (e: FormContext) => {
    const { isValid, fields } = e;
    const { fornavn, etternavn, telefonnummer, tidsrom } = fields;

    if (isValid) {
      const outbound = {
        fornavn,
        etternavn,
        telefonnummer,
        tidsrom: (tidsrom.FORMIDDAG && tidsrom.ETTERMIDDAG
          ? "BEGGE"
          : tidsrom.FORMIDDAG
          ? "FORMIDDAG"
          : "ETTERMIDDAG") as TIDSROM
      };

      settLoading(true);
      postSamiskBestillSamtale(outbound)
        .then(() => {
          settSuccess(true);
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
      <div className="bestilling-av-samtale__header">
        <div className="bestilling-av-samtale__tittel">
          <Sidetittel>
            Jearaldat bagadallama oažžut sámegillii telefovnnas
          </Sidetittel>
        </div>
      </div>
      <div className={"tb__veileder"}>
        <Veilederpanel
          svg={<img src={VeilederIcon} alt="Veileder" />}
          type={"plakat"}
          kompakt={true}
        >
          <div className={"tb__veileder-container"}>
            <Normaltekst>
              Diŋgo dás davvisámegilli bálvalusa mas vástiduvvo dutnje
              sámegillii buot NAV – bálvalusain ja oajuin. Mii veahkehit gávdnat
              mo du áššiin manná, ja veahkehit du dovdat rivttiid ja
              geatnegasvuođaid mat leat álbmotoadjolága njuolggadusain. Don
              gávnnat dieđuid iežat áššis neahttabálvalusas nav.no Ditt NAV. Don
              sáhtát iskat mii dutnje lea máksojuvvon dás:
            </Normaltekst>
            <br />
            <Normaltekst>
              Don sáhtat ain riŋget NAV-bálvalussii 55 55 33 33 ja dáhtot ahte
              davvisámegielat bagadalli riŋge dutnje. Muite addit riegadan- ja
              persunnummara ja maid telefunnummara masa davvisámegielat galga
              riŋget.
            </Normaltekst>
          </div>
        </Veilederpanel>
      </div>
      <Box>
        {success ? (
          <Takk />
        ) : (
          <FormValidation
            onSubmit={send}
            config={formConfig}
            initialValues={initialValues}
          >
            {({ errors, fields, submitted, setField, isValid }) => (
              <div className={"skjema__content"}>
                <div>
                  <InputField
                    bredde={"M"}
                    label={"Ovdanamma"}
                    value={fields.fornavn}
                    error={errors.fornavn}
                    onChange={v => setField({ fornavn: v })}
                    submitted={submitted}
                  />
                  <InputField
                    bredde={"M"}
                    label={"Goargu"}
                    value={fields.etternavn}
                    error={errors.etternavn}
                    onChange={v => setField({ etternavn: v })}
                    submitted={submitted}
                  />
                  <InputField
                    bredde={"S"}
                    label={"Telefovdna*"}
                    value={fields.telefonnummer}
                    error={errors.telefonnummer}
                    onChange={v => setField({ telefonnummer: v })}
                    submitted={submitted}
                  />
                </div>
                <div className="bestilling-av-samtale__tidsrom">
                  <legend className="skjema__legend">
                    Goas heive duinna váldit oktavuođa?
                  </legend>
                  <SkjemaGruppe feil={sjekkForFeil(submitted, errors.tidsrom)}>
                    <Checkbox
                      label={"08.00-10.00"}
                      value={"FORMIDDAG"}
                      onChange={e => {
                        const value = e.target.value;
                        setField({
                          tidsrom: {
                            ...fields.tidsrom,
                            [value]: !fields.tidsrom[value]
                          }
                        });
                      }}
                    />
                    <Checkbox
                      label={"13.30-15.30"}
                      value={"ETTERMIDDAG"}
                      onChange={e => {
                        const value = e.target.value;
                        setField({
                          tidsrom: {
                            ...fields.tidsrom,
                            [value]: !fields.tidsrom[value]
                          }
                        });
                      }}
                    />
                  </SkjemaGruppe>
                </div>
                {error && (
                  <div>
                    <AlertStripeFeil>
                      <FormattedMessage id={"felter.noegikkgalt"} /> {error}
                    </AlertStripeFeil>
                  </div>
                )}
                <div className="bestilling-av-samtale__knapper">
                  <div className="bestilling-av-samtale__knapp">
                    <Knapp
                      type={"standard"}
                      htmlType={"submit"}
                      disabled={loading || (submitted && !isValid)}
                    >
                      {loading ? (
                        <NavFrontendSpinner type={"S"} />
                      ) : (
                        "Sádde jearaldaga"
                      )}
                    </Knapp>
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
export default withRouter(BAS);
