import { SokeTreff } from "../FinnNavKontorSok";
import { enhetsnrTilEnhetsinfo, KontorLenke } from "./KontorLenke";
import { Element } from "nav-frontend-typografi";
import React from "react";

const cssPrefix = "finn-kontor";

type Props = {
  treff: SokeTreff,
  query: string,
  kontorIdStart?: number,
  sortByName?: boolean
};

export const TreffStedsnavn = ({treff, query, kontorIdStart, sortByName}: Props) => {
  const treffStart = treff.treffIndex || 0;
  const treffSlutt = treffStart + query.length;
  const stedsnavn = treff.treffString;

  if (sortByName) {
    treff.enhetsnrArray.sort((a, b) =>
        enhetsnrTilEnhetsinfo[a].navn.localeCompare(enhetsnrTilEnhetsinfo[b].navn));
  }

  const kontorLenker = treff.enhetsnrArray
    .map((enhetsnr, index) => (
      <KontorLenke
        enhetsnr={enhetsnr}
        key={enhetsnr}
        id={kontorIdStart !== undefined ? `kontor-id-${kontorIdStart + index}` : undefined}
      />
    ));

  return (
    <div className={`${cssPrefix}__resultat`}>
      <Element>
        <span className={`${cssPrefix}__treff-faded`}>{stedsnavn.slice(0, treffStart)}</span>
        <span className={`${cssPrefix}__treff-uthevet`}>{stedsnavn.slice(treffStart, treffSlutt)}</span>
        <span className={`${cssPrefix}__treff-faded`}>{stedsnavn.slice(treffSlutt)}</span>
      </Element>
      <div className={`${cssPrefix}__kontorliste`}>
        {kontorLenker}
      </div>
    </div>
  );
};
