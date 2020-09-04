import React, { useEffect } from "react";

import Breadcrumbs, { BreadcrumbLenke } from "../breadcrumbs/Breadcrumbs";
import { forsidePath, useLocalePaths } from "Config";
import { setAvailableLanguages } from "@navikt/nav-dekoratoren-moduler";
import { useLocation } from "react-router-dom";

const baseLenker: Array<BreadcrumbLenke> = [];

export const ToppLinje = () => {
  const location = useLocation();

  useEffect(() => {
    const subSegments = location.pathname
      .split(forsidePath)[1]
      .split("/")
      .slice(2)
      .join("/");

    const languages = [
      {
        locale: "nb",
        url: `${forsidePath}/nb/${subSegments}`,
      },
      {
        locale: "en",
        url: `${forsidePath}/en/${subSegments}`,
      },
    ];

    setAvailableLanguages(languages);
  }, [location]);

  return (
    <div className={"kontakt-oss-topplinje"}>
      <Breadcrumbs
        currentPath={window.location.pathname}
        basePath={useLocalePaths().baseAppPath}
        baseLenker={baseLenker}
      />
    </div>
  );
};

export default ToppLinje;
