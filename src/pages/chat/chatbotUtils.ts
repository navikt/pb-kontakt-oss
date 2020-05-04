import { chatConfig } from "./data/chatConfig";

const storageKeys = {
  ...chatConfig.storageKeys,
  temp: "temp-storage",
};

// TODO: finn denne ut fra styled-components algoritme som genererer classnames
const getApneKnappClassName = () => {
  return "sc-eqIVtm";
};

const getButtonFromClassname = (className: string, index = 0) => {
  const buttons = document.getElementsByClassName(className);
  const button = (buttons && buttons.length > index) && (buttons[index] as HTMLElement);

  return button;
};

const getClickFunc = (className: string, index = 0) => {
  const button = getButtonFromClassname(className, index);

  if (button) {
    return button.click.bind(button);
  }

  return null;
};

const getApneFunc = () => {
  return getClickFunc(getApneKnappClassName());
};

const apneChatbot = async () => {
  const apneFunc = getApneFunc();

  if (!apneFunc) {
    return false;
  }

  await apneFunc();
  return true;
};

const clearSessionData = () => {
  Object.entries(storageKeys).forEach(
    ([_, storageKey]) => sessionStorage.removeItem(storageKey)
  );
};

export default {
  apneChatbot,
  clearSessionData,
};
