import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { HoyreChevron } from "nav-frontend-chevron";
import { Normaltekst } from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";
import HjemIkon from "assets/icons/line/home-1-line.svg";

type BreadcrumbsProps = {
  currentPath: string;
  basePath: string;
  baseLenker?: Array<BreadcrumbLenke>;
};

type SegmentProps = {
  lenke: BreadcrumbLenke;
  isCurrentPath: boolean;
};

export type BreadcrumbLenke = {
  url: string;
  lenketekstId: string;
  isExternal?: boolean;
};

const cssPrefix = "breadcrumbs";

const getSegmentLenker = (currentPath: string, basePath: string): Array<BreadcrumbLenke> => {
  const pathSegments = currentPath.replace(basePath, "").split("/");

  // fjerner tomt segment ved trailing slash
  if (pathSegments.length > 1 && pathSegments[pathSegments.length - 1] === "") {
    pathSegments.pop();
  }

  return pathSegments.map((segment, index) => {
    const combinedSegments = pathSegments.slice(0, index + 1);
    const segmentPath = combinedSegments.length === 1 ? "" : combinedSegments.join("/");

    return {
      url: `${basePath}${segmentPath}`,
      lenketekstId: `breadcrumb.${segment}`,
    };
  });
};

const SegmentNode = ({lenke, isCurrentPath}: SegmentProps) => {
  const lenketekst = <FormattedMessage id={lenke.lenketekstId} />;

  return (
    <Normaltekst className={`${cssPrefix}__segment`}>
      { isCurrentPath
        ? lenketekst
        : (
          <>
            {
              lenke.isExternal
              ? <Lenke href={lenke.url} className="lenke">{lenketekst}</Lenke>
              : <Link to={lenke.url} className="lenke">{lenketekst}</Link>
            }
            <HoyreChevron className={`${cssPrefix}__chevron`} />
          </>
        )
      }
    </Normaltekst>
  );
};

const Breadcrumbs = ({currentPath, basePath, baseLenker = []}: BreadcrumbsProps) => {
  const lenker = baseLenker.concat(getSegmentLenker(currentPath, basePath));

  return (
    <div className={cssPrefix}>
      <img src={HjemIkon} alt="" className={`${cssPrefix}__ikon`} />
      {lenker.map((lenke: BreadcrumbLenke, index: number) => (
        <SegmentNode
          lenke={lenke}
          isCurrentPath={index === lenker.length - 1}
          key={`segment-${index}`}
        />
      ))}
    </div>
  );
};

export default Breadcrumbs;
