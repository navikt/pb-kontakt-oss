import React from "react";
import { Alert } from "../../utils/sanity/endpoints/alert";
import { KoronaVirusVarsel } from "./korona-virus-varsel/KoronaVirusVarsel";
import { TekniskProblemBackend } from "./teknisk-problem-backend/TekniskProblemBackend";
import { useStore } from "../../providers/Provider";
import { Kanal } from "../../types/kanaler";
import { forsideSanityId, kanalToSanityId } from "../../utils/sanity/endpoints/channels";
import { SanityVarsel } from "./SanityVarsel";

type Props = {
  kanal?: Kanal;
  children?: JSX.Element;
};

export const VarselVisning = ({ kanal, children }: Props) => {
  const [{ alerts, visTekniskFeilMelding }] = useStore();
  const varsler = alerts.alerts;
  const sideId = (kanal && kanalToSanityId[kanal]) || forsideSanityId;

  const varslerSomSkalVises = varsler.reduce((acc, varsel) => (
    varsel.displayOnAllPages || (varsel.displayOnSpesificPages && varsel.displayOnSpesificPages.includes(sideId))
      ? acc.concat(varsel)
      : acc), [] as Alert[]);

  return (
    <div className={`${alerts.isLoaded ? " varsler-container--loaded" : "varsler-container--loading"}`}>
      {visTekniskFeilMelding && <TekniskProblemBackend />}
      <KoronaVirusVarsel />
      {varslerSomSkalVises
        .map((varsel, index) => <SanityVarsel varsel={varsel} key={index} />)}
      {children}
    </div>
  );
};
