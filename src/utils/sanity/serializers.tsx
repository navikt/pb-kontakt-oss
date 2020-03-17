import {
  Element,
  Ingress,
  Innholdstittel,
  Normaltekst,
  Sidetittel,
  Systemtittel,
  Undertittel
} from "nav-frontend-typografi";
import { alertSerializer } from "./endpoints/alert";
import React from "react";
import BlockContent from "@sanity/block-content-to-react";

export enum TypoStyle {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
  H5 = "h5",
  H6 = "h6",
  Normal = "normal",
}

export enum Language {
  Bokmaal = "nb"
}

const language = Language.Bokmaal;

const typoComponents = {
  [TypoStyle.H1]: Sidetittel,
  [TypoStyle.H2]: Innholdstittel,
  [TypoStyle.H3]: Systemtittel,
  [TypoStyle.H4]: Undertittel,
  [TypoStyle.H5]: Ingress,
  [TypoStyle.H6]: Element,
  [TypoStyle.Normal]: Normaltekst
};

export type TextBlock = {
  style: TypoStyle;
  children: TextWithMarks[];
};

export type LocaleBlock = { [key in Language]: TextBlock };

export type LocaleString = { [key in Language]: string };

export type LocaleLink = { [key in Language]: string };

// TODO: oppdater med marks
export type TextWithMarks = {
  marks: string[],
  text: string
};

export type LenkeData = {
  link: string;
  link_text: TextBlock[];
};

const localeBlockSerializer = (block: { node: LocaleBlock }) => {
  const blocks = block.node[language];
  return blocks ? <BlockContent blocks={block.node[language]} serializers={serializers} /> : null;
};

const blockSerializer = (block: { node: TextBlock }) => {
  const TypoComponent = typoComponents[block.node.style] || typoComponents[TypoStyle.Normal];

  return (
    <TypoComponent>
      {block.node.children.reduce((acc, textWithMarks) => acc + textWithMarks.text, "")}
    </TypoComponent>
  );
};

export const serializers = {
  types: {
    alert: alertSerializer,
    localeBlock: localeBlockSerializer,
    block: blockSerializer,
  }
};
