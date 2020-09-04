import React from "react";

import Breadcrumbs, { BreadcrumbLenke } from "../breadcrumbs/Breadcrumbs";
import Environment from "../../Environments";
import { SprakVelger } from "../sprakvelger/SprakVelger";
import { useLocalePaths } from "../../Config";

const baseLenker: Array<BreadcrumbLenke> = [];

export const ToppLinje = () => {
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
