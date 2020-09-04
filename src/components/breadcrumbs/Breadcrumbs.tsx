import React, { useEffect } from "react";
import { setBreadcrumbs } from "@navikt/nav-dekoratoren-moduler";
import { useIntl } from "react-intl";

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

const getSegmentLenker = (
  currentPath: string,
  basePath: string
): Array<BreadcrumbLenke> => {
  const pathSegments = currentPath.replace(basePath, "").split("/");

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
  const lenker = baseLenker.concat(getSegmentLenker(currentPath, basePath));

  // Set breadcrumbs in decorator
  useEffect(() => {
    const breadcrumbs = lenker.map((lenke) => ({
      name: formatMessage({ id: lenke.lenketekstId }),
      url: lenke.url,
    }));
    setBreadcrumbs(breadcrumbs);
  }, [lenker]);

  return <></>;
};

export default Breadcrumbs;
