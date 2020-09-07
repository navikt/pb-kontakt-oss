import React, { useEffect } from "react";
import { setBreadcrumbs } from "@navikt/nav-dekoratoren-moduler";
import { useIntl } from "react-intl";
import { onBreadcrumbClick } from "@navikt/nav-dekoratoren-moduler/dist";
import { useHistory } from "react-router-dom";

type BreadcrumbsProps = {
  currentPath: string;
  basePath: string;
  baseLenker?: Array<BreadcrumbLenke>;
};

export type BreadcrumbLenke = {
  url: string;
  lenketekstId: string;
  isExternal?: boolean;
};

const getSegmentLenker = (
  currentPath: string,
  basePath: string
): Array<BreadcrumbLenke> => {
  const pathSegments = currentPath
    .replace(/\/person\/kontakt-oss\/*/, "")
    .split("/");

  // fjerner tomt segment ved trailing slash
  if (pathSegments.length > 1 && pathSegments[pathSegments.length - 1] === "") {
    pathSegments.pop();
  }

  return pathSegments.map((segment, index) => {
    const combinedSegments = pathSegments.slice(0, index + 1);
    const segmentPath =
      combinedSegments.length === 1 ? "" : combinedSegments.join("/");

    return {
      url: `${basePath}${segmentPath}`,
      lenketekstId: `breadcrumb.${segment}`,
    };
  });
};

const Breadcrumbs = ({
  currentPath,
  basePath,
  baseLenker = [],
}: BreadcrumbsProps) => {
  const { formatMessage } = useIntl();
  const history = useHistory();
  const lenker = baseLenker.concat(getSegmentLenker(currentPath, basePath));

  onBreadcrumbClick((breadcrumb) => {
    history.push(breadcrumb.url);
  });

  // Set breadcrumbs in decorator
  useEffect(() => {
    const breadcrumbs = lenker.map((lenke) => ({
      title: formatMessage({ id: lenke.lenketekstId }),
      handleInApp: lenke.url.startsWith("/"),
      url: lenke.url,
    }));
    setBreadcrumbs(breadcrumbs);
  }, [formatMessage, lenker]);

  return <></>;
};

export default Breadcrumbs;
