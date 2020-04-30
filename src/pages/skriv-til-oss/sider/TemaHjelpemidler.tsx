import React from "react";
import SkrivTilOssBase from "../SkrivTilOssBase";
import { hjelpemidlerLenkepaneler } from "../skrivTilOssTemaLenker";
import { MetaTags } from "../../../components/metatags/MetaTags";
import { paths } from "../../../Config";

const TemaHjelpemidler = () => (
  <SkrivTilOssBase
    tittelId={"skrivtiloss.hjelpemidler.mellomside.tittel"}
    lenkepanelData={hjelpemidlerLenkepaneler}
  >
    <MetaTags
      titleId={"skrivtiloss.hjelpemidler.mellomside.tittel"}
      descriptionId={"skrivtiloss.hjelpemidler.description"}
      path={paths.skrivTilOss.hjelpemidler}
    />
  </SkrivTilOssBase>
);

export default TemaHjelpemidler;
