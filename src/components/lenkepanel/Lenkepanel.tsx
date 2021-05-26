import React from "react";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import { Link } from "react-router-dom";
import { LenkepanelBase } from "nav-frontend-lenkepanel";
import { FormattedMessage } from "react-intl";
import { urls } from "../../Config";
import { useStore } from "../../providers/Provider";
import { logLinkClick } from "../../utils/amplitude";

export interface Props {
  id: string;
  tittel: string;
  beskrivelse?: string;
  lenkeTekst: string;
  to: string;
  external?: boolean;
  icon?: string;
}

const Lenkepanel = (props: Props) => {
  const [{ locale }] = useStore();
  return (
    <LenkepanelBase
      href={props.to}
      border={true}
      className="linkbox__container"
      linkCreator={(p) => {
        return props.external ? (
          <a href={props.to} {...p}>
            {p.children}
          </a>
        ) : (
          <Link to={props.to} {...p}>
            {p.children}
          </Link>
        );
      }}
      onClick={() => logLinkClick(props.to, props.tittel, "tilbakemelding")}
    >
      <div className={"linkbox__row"}>
        {props.icon && (
          <div className="linkbox__icon-container">
            <img
              className="linkbox__icon"
              src={props.icon}
              alt={props.tittel}
            />
          </div>
        )}
        <div>
          <div className="linkbox__tittel lenkepanel__heading">
            <Undertittel>{props.tittel}</Undertittel>
          </div>
          {props.beskrivelse && (
            <div className="linkbox__beskrivelse">
              <Normaltekst>
                <FormattedMessage
                  id={props.beskrivelse}
                  values={{
                    KlagerettigheterLenke: (text: string) => (
                      <a
                        className={"lenke"}
                        href={urls.tilbakemeldinger.klagerettigheter[locale]}
                      >
                        {text}
                      </a>
                    ),
                  }}
                />
              </Normaltekst>
            </div>
          )}
        </div>
      </div>
    </LenkepanelBase>
  );
};

export default Lenkepanel;
