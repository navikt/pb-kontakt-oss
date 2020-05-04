const openButtonClassname = "sc-eqIVtm";

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

const apneChatbot = async () => {
  const openFunc = getClickFunc(openButtonClassname);

  if (!openFunc) {
    return false;
  }

  await openFunc();
  return true;
};

export default {
  apneChatbot,
};
