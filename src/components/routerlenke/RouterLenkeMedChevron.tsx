import React from "react";
import { Link } from "react-router-dom";
import Lenke from "nav-frontend-lenker";
import { HoyreChevron } from "nav-frontend-chevron";

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
    <span>
      {tekst}
    </span>
  </>
);

const RouterLenkeMedChevron = (props: Props) => {
  const { href, children, isExternal, className, id, onClick } = props;
  const lenkeTekst = lenkeTekstMedChevron(children);

  return isExternal ? (
    <Lenke
      href={href}
      className={`chevronlenke ${className}`}
      onClick={onClick}
      id={id}
    >
      {lenkeTekst}
    </Lenke>
  ) : (
    <Link
      to={href}
      className={`chevronlenke ${className} lenke`}
      onClick={onClick}
      id={id}
    >
      {lenkeTekst}
    </Link>
  );
};

export default RouterLenkeMedChevron;
