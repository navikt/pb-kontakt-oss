import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Input, Label } from "nav-frontend-skjema";
import { Form } from "calidation";
import { Knapp } from "nav-frontend-knapper";
import { Normaltekst, Sidetittel } from "nav-frontend-typografi";
import Topplinje from "../../components/topp-linje/ToppLinje";
import { ResultatvisningVedSubmit } from "./components/ResultatvisningVedSubmit";
import { ResultatvisningDynamisk } from "./components/ResultatvisningDynamisk";
import {
  kjorSokOgReturnerResultat,
  minQueryLength,
  SokeResultat,
} from "./FinnNavKontorSok";
import { paths } from "../../Config";
import { MetaTags } from "../../components/metatags/MetaTags";
import { VarselVisning } from "../../components/varsler/VarselVisning";
import { Kanal } from "../../types/kanaler";
import { logAmplitudeEvent } from "../../utils/amplitude";

const cssPrefix = "finn-kontor";

const FinnNavKontorPage = () => {
  const [inputElement, setInputElement] = useState<HTMLInputElement>();
  const [sokeResultat, setSokeResultat] = useState<SokeResultat | null>();
  const [
    sokeResultatDynamisk,
    setSokeResultatDynamisk,
  ] = useState<SokeResultat | null>();

  return (
    <div className={`${cssPrefix} pagecontent`}>
      <Topplinje />
      <MetaTags
        titleId={"finnkontor.tittel"}
        descriptionId={"finnkontor.ingress"}
        path={paths.finnDittNavKontorUinnlogget}
      />

      <div className={`${cssPrefix}__header`}>
        <Sidetittel>
          <FormattedMessage id={"finnkontor.tittel"} />
        </Sidetittel>
        <Normaltekst className={`${cssPrefix}__ingress`}>
          <FormattedMessage id={"finnkontor.ingress"} />
        </Normaltekst>
      </div>

      <VarselVisning kanal={Kanal.FinnKontor} visKoronaVarsel={false} />

      <div className={`${cssPrefix}__innhold`}>
        <Form
          onSubmit={() => {
            if (inputElement) {
              setSokeResultat(kjorSokOgReturnerResultat(inputElement.value));
              logAmplitudeEvent("Kontor-søk submit", {
                sokInput: inputElement.value,
              });
            }
            setSokeResultatDynamisk(null);
          }}
          className={`${cssPrefix}__input-gruppe`}
        >
          <Label htmlFor={"finn-kontor-input-id"}>
            <FormattedMessage id={"finnkontor.sok.label"} />
          </Label>
          <div className={`${cssPrefix}__input-og-knapp`}>
            <Input
              id={"finn-kontor-input-id"}
              className={`${cssPrefix}__input`}
              type={"text"}
              autoFocus={true}
              autoComplete={"off"}
              onFocus={(e) => setInputElement(e.target)}
              onChange={(e) =>
                setSokeResultatDynamisk(
                  kjorSokOgReturnerResultat(e.target.value)
                )
              }
              onKeyDown={(e) => e.key === "Escape" && e.currentTarget.blur()}
            />
            <Knapp
              htmlType={"submit"}
              type={"standard"}
              className={`${cssPrefix}__knapp`}
              mini={true}
              id={"finn-kontor-knapp-id"}
            >
              <FormattedMessage id={"finnkontor.sok.knapp"} />
            </Knapp>
          </div>
          {sokeResultatDynamisk &&
            sokeResultatDynamisk.query.length >= minQueryLength && (
              <div
                className={`${cssPrefix}__preview-container`}
                id={"preview-container-id"}
                tabIndex={-1}
              >
                <ResultatvisningDynamisk resultat={sokeResultatDynamisk} />
              </div>
            )}
        </Form>
        {sokeResultat && (
          <div className={`${cssPrefix}__resultat-container`}>
            <ResultatvisningVedSubmit resultat={sokeResultat} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FinnNavKontorPage;
