import ApningsTider from "../../../utils/apningstider";
import { AvviksPeriode, Ukedag } from "../../../types/datotid";
import { ChatTema } from "../../../types/kanaler";

const avvikAlle: AvviksPeriode = {
  visFraDato: "09:00 29-04-2020",
  datoer: {
    "01-05-2020": null,
  }
};

const apningstiderHverdag = {
  start: "09.00",
  end: "14.30"
};

const apningstiderDefault = new ApningsTider({
  [Ukedag.Mandag]: apningstiderHverdag,
  [Ukedag.Tirsdag]: apningstiderHverdag,
  [Ukedag.Onsdag]: apningstiderHverdag,
  [Ukedag.Torsdag]: apningstiderHverdag,
  [Ukedag.Fredag]: apningstiderHverdag,
  [Ukedag.Lordag]: null,
  [Ukedag.Sondag]: null
}, [avvikAlle]);

export const chatApningstider: { [key in ChatTema]: ApningsTider | null } = {
  [ChatTema.Arbeidsgiver]: apningstiderDefault,
  [ChatTema.Jobbsoker]: apningstiderDefault,
  [ChatTema.Syk]: apningstiderDefault,
  [ChatTema.Familie]: apningstiderDefault,
  [ChatTema.Ufor]: apningstiderDefault,
  [ChatTema.Sosial]: apningstiderDefault,
  [ChatTema.Okonomi]: apningstiderDefault,
  [ChatTema.EURES]: null
};
