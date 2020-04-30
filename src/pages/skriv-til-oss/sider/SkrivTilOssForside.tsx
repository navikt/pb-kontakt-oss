import React from "react";
import SkrivTilOssBase from "../SkrivTilOssBase";
import { Normaltekst } from "nav-frontend-typografi";
import { useStore } from "../../../providers/Provider";
import { Kanal } from "../../../types/kanaler";
import { skrivTilOssLenkepaneler } from "../skrivTilOssTemaLenker";
import { LocaleBlockContent } from "../../../components/sanity-blocks/LocaleBlockContent";
import { useLocaleString } from "../../../utils/sanity/useLocaleString";
import { MetaTags } from "../../../components/metatags/MetaTags";
import { paths } from "../../../Config";

const SkrivTilOssForside = () => {
  const [{ channels }] = useStore();
  const localeString = useLocaleString();

  const stoProps = channels.props[Kanal.SkrivTilOss];
  const svartid = localeString(stoProps.answer_time);

  return (
    <SkrivTilOssBase
      tittelId={"skrivtiloss.tittel"}
      lenkepanelData={skrivTilOssLenkepaneler}
    >
      <>
        <MetaTags
          titleId={"skrivtiloss.tittel"}
          descriptionId={"skrivtiloss.description"}
          path={paths.skrivTilOss.forside}
        />
        {svartid && (
          <Normaltekst className={"svartid"}>
            {svartid}
          </Normaltekst>
        )}
        <LocaleBlockContent localeBlock={stoProps.preamble} />
      </>
    </SkrivTilOssBase>
  );
};

export default SkrivTilOssForside;
