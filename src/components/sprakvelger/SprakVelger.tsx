import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useStore } from "../../providers/Provider";
import { Locale, setNewLocale } from "../../utils/locale";
import GlobeIkon from "assets/icons/filled/globe-1-filled.svg";
import { Normaltekst } from "nav-frontend-typografi";
import { NedChevron } from "nav-frontend-chevron";
import { logEvent } from "../../utils/logger";
import { useSelect } from "downshift";
const cssPrefix = "sprakvelger";

const farger = {
  navGra20: "#C6C2BF",
  navBla: "#0067C5"
};

type LocaleOption = {
  value: Locale;
  label: string;
};

const option = (text: string) => (
  <Normaltekst className={`${cssPrefix}__option`}>
      <span className="not-selected">
        {text}
      </span>
  </Normaltekst>
);

const selectedOption = (text: string, screenReaderText: string) => (
  <Normaltekst className={`${cssPrefix}__option`}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50%" cy="50%" r="4" fill="black"  />
      </svg>
      {text} <span className="sr-only">{screenReaderText}</span>
  </Normaltekst>
);

export const SprakVelger = () => {
  const [{ locale }, dispatch] = useStore();
  const { formatMessage } = useIntl();
  const options: LocaleOption[] = [
    { value: "nb", label: (formatMessage({ id: "sprak.nb" })) },
    { value: "en", label: (formatMessage({ id: "sprak.en" })) }
  ];
  const [selectedItem, setSelectedItem] = useState(() => options.find((option: LocaleOption) => option.value === locale));

  const selectionHandler = (selected: LocaleOption) => {
    setSelectedItem(selected);
    const value = (selected as LocaleOption).value;
    logEvent({ event: `sprakvelger-valgt-${value}` });
    selected && setNewLocale(value, dispatch);
  };

  const knappeInnhold = (
    <span className={`${cssPrefix}__knapp-tekst`}>
      <img src={GlobeIkon} alt="" className={`${cssPrefix}__ikon`} />
      <Normaltekst>{formatMessage({ id: "sprak.velg" })}</Normaltekst>
    </span>
  );

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items: options,
    selectedItem,
    itemToString: (item: LocaleOption | null ) => item ? item.value : "",
    onSelectedItemChange: (changes) => changes.selectedItem && selectionHandler(changes.selectedItem),
    onIsOpenChange: (changes) => {
      if (changes.isOpen) {
        return logEvent({ event: "sprakvelger-clicked" });
      }
    }
} );

  return (
    <div className={cssPrefix}>
        <label className="sr-only" {...getLabelProps()}>{formatMessage({ id: "sprak.velg" })}</label>
        <button
          {...getToggleButtonProps()}
          className={`${cssPrefix}__knapp skjemaelement__input`}
          type="button"
        >
          {knappeInnhold}
          <NedChevron />
        </button>

      <ul {...getMenuProps()}
          className={`${cssPrefix}__menu`}
          style={isOpen ? {
            boxShadow: "0 0.05rem 0.25rem 0.125rem rgba(0, 0, 0, 0.08)",
            border: "1px solid",
            borderRadius: "0 0 4px 4px",
            outline: "none",
            borderColor: farger.navGra20,
            borderTop: "none"} : {border: "none"}}
      >
          {isOpen &&
          options.map((item, index) => (
            <li
              style={
                highlightedIndex === index ? {
                  backgroundColor: farger.navBla,
                  color: "white"
                } : {
                  backgroundColor: "white",
                  color: "black"
                }
              }
              className="menuList"
              key={`${item.value}${index}`}
              {...getItemProps({item, index})}
            >
              {selectedItem?.label === item.label ? selectedOption(item.label, formatMessage({ id: "sprak.valgt" }))
                : option(item.label)
              }
            </li>
          ))}
        </ul>
    </div>

  );
};
