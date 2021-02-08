import React from "react";
import { KoronaVirusVarsel } from "./korona-virus-varsel/KoronaVirusVarsel";
import { TekniskProblemBackend } from "./teknisk-problem-backend/TekniskProblemBackend";
import { useStore } from "../../providers/Provider";
import { Kanal } from "../../types/kanaler";
import { forsideSanityId, kanalToSanityId } from "../../utils/sanity/endpoints/channels";
import { SanityVarsel } from "./SanityVarsel";

type Props = {
  kanal?: Kanal;
  visKoronaVarsel?: boolean;
  children?: JSX.Element;
};

export const VarselVisning = ({ kanal, visKoronaVarsel = true, children }: Props) => {
  const [{ alerts, visTekniskFeilMelding }] = useStore();
  const varsler = alerts.alerts;
  const sideId = (kanal && kanalToSanityId[kanal]) || forsideSanityId;

  const varslerSomSkalVises = varsler.filter(( varsel) =>
    varsel.displayOnAllPages || varsel.displayOnSpesificPages?.includes(sideId));

  return (
    <div className={`${alerts.isLoaded ? " varsler-container--loaded" : "varsler-container--loading"}`}>
      {visTekniskFeilMelding && <TekniskProblemBackend />}
      {visKoronaVarsel && <KoronaVirusVarsel />}
      {varslerSomSkalVises
        .map((varsel, index) => <SanityVarsel varsel={varsel} key={index} />)}
      {children}
    </div>
  );
};
