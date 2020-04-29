import ApningsTider from "../../../utils/apningstider";
import { AvviksPeriode, Ukedag } from "../../../types/datotid";
import { ChatTema } from "../../../types/kanaler";

const avvikAlle: AvviksPeriode = {
  visFraDato: "09:00 29-04-2020",
  datoer: {
    "01-05-2020": null,
  }
};

export const chatApningstider: { [key in ChatTema]: ApningsTider | null } = {
  [ChatTema.Arbeidsgiver]: new ApningsTider({
    [Ukedag.Mandag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Tirsdag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Onsdag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Torsdag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Fredag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Lordag]: null,
    [Ukedag.Sondag]: null
  }, [avvikAlle]),
  [ChatTema.Jobbsoker]: new ApningsTider({
    [Ukedag.Mandag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Tirsdag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Onsdag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Torsdag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Fredag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Lordag]: null,
    [Ukedag.Sondag]: null
  }, [avvikAlle]),
  [ChatTema.Syk]: new ApningsTider({
    [Ukedag.Mandag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Tirsdag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Onsdag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Torsdag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Fredag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Lordag]: null,
    [Ukedag.Sondag]: null
  }, [avvikAlle]),
  [ChatTema.Familie]: new ApningsTider({
    [Ukedag.Mandag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Tirsdag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Onsdag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Torsdag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Fredag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Lordag]: null,
    [Ukedag.Sondag]: null
  }, [avvikAlle]),
  [ChatTema.Ufor]: new ApningsTider({
    [Ukedag.Mandag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Tirsdag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Onsdag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Torsdag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Fredag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Lordag]: null,
    [Ukedag.Sondag]: null
  }, [avvikAlle]),
  [ChatTema.Sosial]: new ApningsTider({
    [Ukedag.Mandag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Tirsdag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Onsdag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Torsdag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Fredag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Lordag]: null,
    [Ukedag.Sondag]: null
  }, [avvikAlle]),
  [ChatTema.Okonomi]: new ApningsTider({
    [Ukedag.Mandag]: {
      start: "10.00",
      end: "15.00"
    },
    [Ukedag.Tirsdag]: {
      start: "10.00",
      end: "15.00"
    },
    [Ukedag.Onsdag]: {
      start: "10.00",
      end: "15.00"
    },
    [Ukedag.Torsdag]: {
      start: "10.00",
      end: "14.30"
    },
    [Ukedag.Fredag]: {
      start: "10.00",
      end: "15.00"
    },
    [Ukedag.Lordag]: null,
    [Ukedag.Sondag]: null
  }, [avvikAlle]),
  [ChatTema.EURES]: null
};
