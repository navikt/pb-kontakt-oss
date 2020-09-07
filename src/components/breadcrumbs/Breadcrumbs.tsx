import React, { useEffect } from "react";
import { setBreadcrumbs } from "@navikt/nav-dekoratoren-moduler";
import { useIntl } from "react-intl";
import { onBreadcrumbClick } from "@navikt/nav-dekoratoren-moduler/dist";
import { useHistory } from "react-router-dom";
import Environment from "../../Environments";

type BreadcrumbsProps = {
  baseLenker?: Array<BreadcrumbLenke>;
};

export type BreadcrumbLenke = {
  url: string;
  lenketekstId: string;
  isExternal?: boolean;
};

const getSegmentLenker = (): Array<BreadcrumbLenke> => {
  const { baseAppPath } = Environment();
  const pathSegments = window.location.pathname
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
      url: `${baseAppPath}/${segmentPath}`,
      lenketekstId: `breadcrumb.${segment}`,
    };
  });
};

const Breadcrumbs = ({ baseLenker = [] }: BreadcrumbsProps) => {
  const { formatMessage } = useIntl();
  const history = useHistory();
  const lenker = baseLenker.concat(getSegmentLenker());

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
