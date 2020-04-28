import React from "react";
import { useIntl } from "react-intl";
import { useStore } from "../../providers/Provider";
import { Locale, setNewLocale } from "../../utils/locale";
import GlobeIkon from "assets/icons/filled/globe-1-filled.svg";
import Select from "react-select";
import { Normaltekst } from "nav-frontend-typografi";
import { HoyreChevron } from "nav-frontend-chevron";
import { Styles } from "react-select/src/styles";

const cssPrefix = "sprakvelger";

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
        ? "#0067C5"
        : provided.backgroundColor,
      color: state.isFocused
        ? "#FFFFFF"
        : provided.color
    }),
    control: (provided, state) => ({
      ...provided,
      boxShadow: state.isFocused
        ? "0 0 0 3px #254b6d"
        : provided.boxShadow,
    })
  };

  return (
    <div className={cssPrefix}>
      <Select
        onChange={(selected) => {
          selected && setNewLocale((selected as LocaleOption).value, dispatch);
        }}
        className={`${cssPrefix}__select`}
        options={options}
        isSearchable={false}
        placeholder={placeholder}
        styles={styles}
      />
    </div>
  );
};
