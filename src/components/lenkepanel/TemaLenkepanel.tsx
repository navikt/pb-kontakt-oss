import { LenkepanelBase } from "nav-frontend-lenkepanel/lib";
import { Link } from "react-router-dom";
import { Undertittel } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import React from "react";
import { logEvent } from "../../utils/logger";
import { useStore } from "../../providers/Provider";
import { TemaLenke } from "../../types/kanaler";
import { LocaleBlockContent } from "../sanity-blocks/LocaleBlockContent";
import { NavContentLoader } from "../content-loader/NavContentLoader";
import { useLocaleString } from "../../utils/sanity/useLocaleString";
import { localePath } from "../../utils/locale";

type Props = {
  lenkepanelData: TemaLenke;
  cssPrefix: string;
  disableIfClosed?: boolean;
};

const TemaLenkepanel = ({ lenkepanelData, cssPrefix, disableIfClosed }: Props) => {
  const onClick = () => {
    logEvent({ event: lenkepanelData.grafanaId });
  };

  const [{ themes, locale }] = useStore();
  const localeString = useLocaleString();

  const tema = lenkepanelData.tema;
  const {status, link} = themes.props[tema];

  const closed = status && status.closed;
  const closedMsg = status && status.message;
  const isDisabled = closed && disableIfClosed;

  const tittel = link && link.title;
  const ingress = link && link.description;

  return (
    <LenkepanelBase
      border={true}
      className={`${cssPrefix}__temalenke linkbox__container ${isDisabled
        ? ` ${cssPrefix}__lenkepanel-disabled` : ""}`}
      href={""}
      linkCreator={!isDisabled ? (props => {
        return lenkepanelData.externalUrl ? (
          <a
            href={lenkepanelData.url}
            className={props.className}
            onClick={onClick}
          >
            {props.children}
          </a>
        ) : (
          <Link
            to={localePath(lenkepanelData.url, locale)}
            className={props.className}
            onClick={onClick}
          >
            {props.children}
          </Link>
        );
      }) : undefined}
    >
      <div>
        {lenkepanelData.ikon && <div>{lenkepanelData.ikon}</div>}
        <div>
          <Undertittel className={`${cssPrefix}__temalenke-header lenkepanel__heading`}>
            {tittel
              ? localeString(tittel)
              : <FormattedMessage id={lenkepanelData.fallbackTittelId} />}
          </Undertittel>
          <div className={`${cssPrefix}__lenkepanel-ingress`}>
            {themes.isLoaded
              ? <LocaleBlockContent localeBlock={ingress} />
              : <NavContentLoader lines={2} lineHeight={6} />}
          </div>
          {isDisabled && <LocaleBlockContent localeBlock={closedMsg} />}
        </div>
      </div>
    </LenkepanelBase>
  );
};

export default TemaLenkepanel;
