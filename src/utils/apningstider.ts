import moment from "moment";
import { ApningsTider, Ukedager } from "../types/datotid";

const isOpen = (apningstider: ApningsTider, stengteDager?: Set<string>, timeOffsetMs = 0) => {
  const naaTid = moment().add(timeOffsetMs, "ms");

  if (stengteDager && stengteDager.has(naaTid.format("DD-MM-YYYY"))) {
    return false;
  }

  const dag = (naaTid.day()) as Ukedager;
  const dagensApningstid = apningstider[dag];

  if (!dagensApningstid) {
    return false;
  }

  const apner = moment(dagensApningstid.start, "HH-mm");
  const lukker = moment(dagensApningstid.end, "HH-mm");

  return naaTid.isBetween(apner, lukker);
};

export default {
  isOpenNow: isOpen,
};