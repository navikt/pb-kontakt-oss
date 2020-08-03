
// Obs: Dette classname'et genereres av styledcomponents i chatbot'en
// Denne er gyldig for chatbot v.1.2.2
const openButtonClassname = "sc-eqIVtm";

export const chatStorageKeys = {
  apen: "chatbot-frida_apen",
  config: "chatbot-frida_config"
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

export const openChatbot = async (callback?: (isOpen: boolean) => void) => {
  const openFunc = getClickFunc(openButtonClassname);

  if (!openFunc) {
    callback && callback(false);
    return;
  }

  await openFunc();
  callback && callback(true);
};

export const setCallbackOnChatbotOpen = (callback: () => void) => {
  const openButton = getButtonFromClassname(openButtonClassname);
  if (!openButton) {
    return;
  }

  openButton.onclick = callback;
};
