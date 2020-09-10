import React, { useState } from "react";
import { useCombobox } from "downshift";
import { NedChevron } from "nav-frontend-chevron";
import { useIntl } from "react-intl";
const cssPrefix = "enhetCombo";

interface Option {
  value: string;
  label: string;
}

interface Props {
  data: Option[] ;
  harFeil: boolean;
  label: React.ReactElement;
  onChange: (value?: Option) => void;
  value?: Option;
}

const farger = {
  navLysGra: "#E9E7E7",
  navBla: "#0067C5",
};

const Combobox = (props: Props) => {
  const { data, harFeil, label, onChange} = props;
  const [inputItems, setInputItems] = useState(data);
  const intl = useIntl();

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    itemToString: (item) => item ? item.label : "",
    onInputValueChange: ({inputValue}) => {
      if (inputValue && inputValue !== "") {
        setInputItems(
          data.filter((item) =>
              item.label.toLowerCase().includes(inputValue.toLowerCase())
            ),
        );
      } else {
        setInputItems(data);
        onChange && onChange(undefined);
      }
    },
    onSelectedItemChange: (value) => {
      value.selectedItem && onChange(value.selectedItem);
    },
    stateReducer : (state, actionAndChanges) => {
      const {type, changes} = actionAndChanges;
      switch (type) {
        // set currently selected item if new item not selected on input blur
        case useCombobox.stateChangeTypes.InputBlur:
          return {
            ...changes,
            inputValue: changes.selectedItem ?
              changes.selectedItem.label : (state.selectedItem?.label || ""),
          };
        default:
          return changes;
      }
    }
  });

  return (
    <>
      <label {...getLabelProps()}>{label}</label>
      <div {...getComboboxProps()} className={`${cssPrefix}__inputWrapper`}>
        <input
          {...getInputProps()}
          className={`${cssPrefix}__input skjemaelement__input${harFeil ? " skjemaelement__input--harFeil" : ""}`}
        />
        <button
          type="button"
          {...getToggleButtonProps( {tabIndex : 0}  )}
          className={`${cssPrefix}__button knapp knapp--kompakt`}
          aria-label={intl.formatMessage({ id: "felter.combobox.knapp.beskrivelse"})}
        >
          <NedChevron />
        </button>
      </div>
      <ul {...getMenuProps()}
          className={`${cssPrefix}__menu`}
          style={
            isOpen ? { border: `1px solid  ${farger.navLysGra}`} : {border: "none"}
          }
      >
          {isOpen &&
          inputItems.map((item, index) => (
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
              className="menuItem"
              key={`${item.value}${index}`}
              {...getItemProps({item, index})}
            >
              {item.label}
            </li>
          ))}
        </ul>
    </>
  );
};

export default Combobox;
