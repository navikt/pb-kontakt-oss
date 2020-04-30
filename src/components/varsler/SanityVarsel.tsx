import React from "react";
import { LocaleBlockContent } from "../sanity-blocks/LocaleBlockContent";
import { Varsel } from "./Varsel";
import { Alert } from "../../utils/sanity/endpoints/alert";

type Props = {
  varsel: Alert;
};

export const SanityVarsel = ({ varsel }: Props) => (
  <Varsel type={varsel.type}>
    <LocaleBlockContent localeBlock={varsel.description} />
  </Varsel>
);
