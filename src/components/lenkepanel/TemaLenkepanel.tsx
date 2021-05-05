import { LenkepanelBase } from "nav-frontend-lenkepanel/lib";
import { Link } from "react-router-dom";
import { Undertittel } from "nav-frontend-typografi";
import { FormattedMessage, useIntl } from "react-intl";
import React from "react";
import { logEvent } from "../../utils/logger";
import { useStore } from "../../providers/Provider";
import { TemaLenke } from "../../types/kanaler";
import { LocaleBlockContent } from "../sanity-blocks/LocaleBlockContent";
import { NavContentLoader } from "../content-loader/NavContentLoader";
import { useLocaleString } from "../../utils/sanity/useLocaleString";
import { localePath } from "../../utils/locale";
import Panel from "nav-frontend-paneler";
import { logLinkClick } from "../../utils/amplitude";

type Props = {
  lenkepanelData: TemaLenke;
  cssPrefix: string;
  disableIfClosed?: boolean;
};

const TemaLenkepanel = ({
  lenkepanelData,
  cssPrefix,
  disableIfClosed,
}: Props) => {
  const onClick = () => {
    logEvent({ event: lenkepanelData.grafanaId });
    if (url) {
      logLinkClick(
        url,
        formatMessage({ id: lenkepanelData.fallbackTittelId }),
        "skriv-til-oss"
      );
    }
  };

  const [{ themes, locale }] = useStore();
  const localeString = useLocaleString();
  const { formatMessage } = useIntl();

  const tema = lenkepanelData.tema;
  const { status, link } = themes.props[tema];

  const closed = status && status.closed;
  const closedMsg = status && status.message;
  const isDisabled = closed && disableIfClosed;

  const tittel = link && link.title;
  const ingress = link && link.description;

  const url = lenkepanelData.url;

  const innhold = (
    <div>
      {lenkepanelData.ikon && <div>{lenkepanelData.ikon}</div>}
      <div>
        <Undertittel
          className={`${cssPrefix}__temalenke-header lenkepanel__heading`}
        >
          {tittel ? (
            localeString(tittel)
          ) : (
            <FormattedMessage id={lenkepanelData.fallbackTittelId} />
          )}
        </Undertittel>
        <div className={`${cssPrefix}__lenkepanel-ingress`}>
          {themes.isLoaded ? (
            <LocaleBlockContent localeBlock={ingress} />
          ) : (
            <NavContentLoader lines={2} lineHeight={6} />
          )}
        </div>
        {isDisabled && <LocaleBlockContent localeBlock={closedMsg} />}
      </div>
    </div>
  );

  return url ? (
    <LenkepanelBase
      border={true}
      className={`${cssPrefix}__temalenke linkbox__container ${
        isDisabled ? ` ${cssPrefix}__lenkepanel-disabled` : ""
      }`}
      href={""}
      linkCreator={
        !isDisabled
          ? (props) => {
              return lenkepanelData.externalUrl ? (
                <a href={url} className={props.className} onClick={onClick}>
                  {props.children}
                </a>
              ) : (
                <Link
                  to={localePath(url, locale)}
                  className={props.className}
                  onClick={onClick}
                >
                  {props.children}
                </Link>
              );
            }
          : undefined
      }
    >
      {innhold}
    </LenkepanelBase>
  ) : (
    <Panel border={true} className={"linkbox__container"}>
      {innhold}
    </Panel>
  );
};

export default TemaLenkepanel;
