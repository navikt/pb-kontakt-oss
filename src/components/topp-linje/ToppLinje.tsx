import React from "react";

import Breadcrumbs, { BreadcrumbLenke } from "../breadcrumbs/Breadcrumbs";
import { urls } from "../../Config";
import HjemIkon from "assets/icons/line/home-1-line.svg";
import Environment from "../../Environments";
import { SprakVelger } from "../sprakvelger/SprakVelger";
import { useStore } from "../../providers/Provider";

const baseLenker: Array<BreadcrumbLenke> = [
  {
    url: Environment().baseUrl,
    lenketekstId: "breadcrumb.nav-no",
    isExternal: true
  }
];

export const ToppLinje = () => {
  return (
    <div className={"kontakt-oss-topplinje"}>
      <Breadcrumbs
        currentPath={window.location.pathname}
        basePath={urls.baseAppPath}
        ikonUrl={HjemIkon}
        baseLenker={baseLenker}
      />
      <SprakVelger />
    </div>
  );
};

export default ToppLinje;