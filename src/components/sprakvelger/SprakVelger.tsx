import React from "react";
import { useIntl } from "react-intl";
import { useStore } from "../../providers/Provider";
import { Locale, setNewLocale } from "../../utils/locale";
import GlobeIkon from "assets/icons/filled/globe-1-filled.svg";
import Select from "react-select";
import { Normaltekst } from "nav-frontend-typografi";
import { HoyreChevron } from "nav-frontend-chevron";
import { Styles } from "react-select/src/styles";
import { ValueType } from "react-select/src/types";
import { logEvent } from "../../utils/logger";

const cssPrefix = "sprakvelger";

const farger = {
  navGra60: "#78706A",
  navBla: "#0067C5",
  navBlaDarken60: "#254b6d"
};

type LocaleOption = {
  value: Locale;
  label: JSX.Element;
};

const option = (text: string) => (
  <Normaltekst>
    <HoyreChevron className={`${cssPrefix}__chevron`} />
    {text}
  </Normaltekst>
);

export const SprakVelger = () => {
  const [, dispatch] = useStore();
  const { formatMessage } = useIntl();

  const selectionHandler = (selected: ValueType<LocaleOption>) => {
    const value = (selected as LocaleOption).value;
    logEvent({ event: `sprakvelger-valgt-${value}` });
    selected && setNewLocale(value, dispatch);
  };

  const options: LocaleOption[] = [
    { value: "nb", label: option(formatMessage({ id: "sprak.nb" })) },
    { value: "en", label: option(formatMessage({ id: "sprak.en" })) }
  ];

  const placeholder = (
    <span className={`${cssPrefix}__placeholder`}>
      <img src={GlobeIkon} alt="" className={`${cssPrefix}__ikon`} />
      <Normaltekst>{formatMessage({ id: "sprak.velg" })}</Normaltekst>
    </span>
  );

  const styles: Styles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? farger.navBla
        : "white",
      color: state.isFocused
        ? "white"
        : "black"
    }),
    control: (provided, state) => ({
      ...provided,
      boxShadow: state.isFocused
        ? `0 0 0 3px ${farger.navBlaDarken60}`
        : provided.boxShadow,
      borderColor: farger.navGra60,
      "&:hover": { borderColor: farger.navBla }
    }),
    menu: (provided) => ({
      ...provided,
      marginTop: "3px",
      paddingTop: "1px",
      borderTopLeftRadius: "0",
      borderTopRightRadius: "0"
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "black"
    })
  };

  return (
    <div className={cssPrefix}>
      <Select
        onChange={selectionHandler}
        className={`${cssPrefix}__select`}
        options={options}
        isSearchable={false}
        placeholder={placeholder}
        styles={styles}
        onMenuOpen={() => logEvent({ event: "sprakvelger-clicked" })}
      />
    </div>
  );
};
