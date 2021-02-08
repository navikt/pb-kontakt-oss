import {
  Element,
  Ingress,
  Innholdstittel,
  Normaltekst,
  Sidetittel,
  Systemtittel,
  Undertittel
} from "nav-frontend-typografi";
import React from "react";
import { TextBlock, TypoStyle } from "./common-types";
import Lenke from "nav-frontend-lenker";

const typoComponents = {
  [TypoStyle.H1]: Sidetittel,
  [TypoStyle.H2]: Innholdstittel,
  [TypoStyle.H3]: Systemtittel,
  [TypoStyle.H4]: Undertittel,
  [TypoStyle.H5]: Ingress,
  [TypoStyle.H6]: Element,
  [TypoStyle.Normal]: Normaltekst
};

const blockSerializer = (block: TextBlock) => {
  const TypoComponent = typoComponents[block.node.style] || typoComponents[TypoStyle.Normal];
  return (
    <TypoComponent>
      {block.children}
    </TypoComponent>
  );
};

const linkSerializer = (link: any) => {
  return link?.mark?.href && link.children ?
    (
      <Lenke href={link.mark.href}>
        {link.children}
      </Lenke>
    ) : null;
};

export const serializers = {
  types: {
    block: blockSerializer,
  },
  marks: {
    link: linkSerializer
  }
};
