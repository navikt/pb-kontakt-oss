import "./polyfills";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { IntlProvider } from "react-intl";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import withMenu from "./clients/apiMock/decorator/decorator-header-withmenu";
import megamenu from "./clients/apiMock/decorator/decorator-megamenu";
import footer from "./clients/apiMock/decorator/decorator-footer";
import scripts from "./clients/apiMock/decorator/decorator-scripts";
import skiplinks from "./clients/apiMock/decorator/decorator-skiplinks";
import styles from "./clients/apiMock/decorator/decorator-styles";
import { StoreProvider, useStore } from "./providers/Provider";
import { initialState, reducer } from "./providers/Store";

import msgsNb from "./language/nb";
import msgsEn from "./language/en";
import { ValidatorsProvider } from "calidation";
import { extraValidators, SimpleValidators } from "./utils/validators";
import { Locale, setLocaleFromUrl } from "./utils/locale";

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

const messages: { [key in Locale]: any } = { nb: msgsNb, en: msgsEn };

const init = async () => {
  if (process.env.NODE_ENV === "development") {
    await import("./clients/apiMock").then(({ setUpMock }) => setUpMock());
    document.body.innerHTML = document.body.innerHTML.replace(
      "{{{NAV_HEADING}}}",
      withMenu
    );
    document.body.innerHTML = document.body.innerHTML.replace(
      "{{{NAV_FOOTER}}}",
      footer
    );
    document.body.innerHTML = document.body.innerHTML.replace(
      "{{{NAV_STYLES}}}",
      styles
    );
    document.body.innerHTML = document.body.innerHTML.replace(
      "{{{NAV_SCRIPTS}}}",
      scripts
    );
    document.body.innerHTML = document.body.innerHTML.replace(
      "{{{NAV_SKIPLINKS}}}",
      skiplinks
    );
    document.body.innerHTML = document.body.innerHTML.replace(
      "{{{MEGAMENU_RESOURCES}}}",
      megamenu
    );
  }

  ReactDOM.render((
    <StoreProvider initialState={initialState} reducer={reducer}>
      <RenderApp />
    </StoreProvider>
  ), document.getElementById("app"));
  serviceWorker.unregister();
};

const RenderApp = () => {
  const [{ locale }, dispatch] = useStore();

  useEffect(() => {
    setLocaleFromUrl(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ValidatorsProvider validators={extraValidators as SimpleValidators}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <App />
      </IntlProvider>
    </ValidatorsProvider>
  );
};

init();
