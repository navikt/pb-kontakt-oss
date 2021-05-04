import React from "react";
import { Link } from "react-router-dom";
import Lenke from "nav-frontend-lenker";
import { HoyreChevron } from "nav-frontend-chevron";
import { logLinkClick } from "../../utils/amplitude";
import { IntlShape, useIntl } from "react-intl";

type Props = {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  isExternal?: boolean;
  className?: string;
  id?: string;
};

const lenkeTekstMedChevron = (tekst: React.ReactNode) => (
  <>
    <span>
      <HoyreChevron className={"chevronlenke__chevron"} />
    </span>
    <span>{tekst}</span>
  </>
);

const getTextStringFromChildren = (
  children: any,
  formatMessage: IntlShape["formatMessage"]
) => {
  if (typeof children === "string") {
    return children;
  }

  const intlId = children?.props?.id;
  if (typeof intlId === "string") {
    return formatMessage({ id: intlId });
  }

  return undefined;
};

const RouterLenkeMedChevron = (props: Props) => {
  const { href, children, isExternal, className, id, onClick } = props;
  const { formatMessage } = useIntl();
  const lenkeTekst = lenkeTekstMedChevron(children);

  const onClickWithTracking = () => {
    logLinkClick(href, getTextStringFromChildren(children, formatMessage));
    onClick?.();
  };

  return isExternal ? (
    <Lenke
      href={href}
      className={`chevronlenke ${className}`}
      onClick={onClickWithTracking}
      id={id}
    >
      {lenkeTekst}
    </Lenke>
  ) : (
    <Link
      to={href}
      className={`chevronlenke ${className} lenke`}
      onClick={onClickWithTracking}
      id={id}
    >
      {lenkeTekst}
    </Link>
  );
};

export default RouterLenkeMedChevron;
