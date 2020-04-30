import React from "react";
import { Locale } from "../locale";

export enum TypoStyle {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
  H5 = "h5",
  H6 = "h6",
  Normal = "normal",
}

export type TextBlock = {
  node: {style: TypoStyle};
  children: React.ReactElement[];
};

export type LocaleBlock = { [key in Locale]: TextBlock };

export type LocaleString = { [key in Locale]: string };

export type LocaleUrl = { [key in Locale]: string };

export type Page = {
  content: LocaleBlock;
  title: LocaleString;
};