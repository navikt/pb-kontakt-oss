import React from "react";
import { TekniskProblemBackend } from "./teknisk-problem-backend/TekniskProblemBackend";
import { useStore } from "../../providers/Provider";
import { Kanal } from "../../types/kanaler";
import { SanityVarsel } from "./SanityVarsel";

type Props = {
  kanal: Kanal;
  children?: JSX.Element;
};

export const VarselVisning = ({ kanal, children }: Props) => {
  const [{ alerts, visTekniskFeilMelding }] = useStore();
  const varsler = alerts.alerts;

  const varslerSomSkalVises = varsler.filter(
    (varsel) =>
      varsel.displayOnAllPages || varsel.displayOnSpesificPages?.includes(kanal)
  );

  return (
    <div
      className={`${
        alerts.isLoaded
          ? " varsler-container--loaded"
          : "varsler-container--loading"
      }`}
    >
      {visTekniskFeilMelding && <TekniskProblemBackend />}
      {varslerSomSkalVises.map((varsel, index) => (
        <SanityVarsel varsel={varsel} key={index} />
      ))}
      {children}
    </div>
  );
};
