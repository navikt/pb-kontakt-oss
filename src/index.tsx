import "./polyfills";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { IntlProvider } from "react-intl";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { StoreProvider, useStore } from "./providers/Provider";
import { initialState, reducer } from "./providers/Store";

import msgsNb from "./language/nb";
import msgsEn from "./language/en";
import { ValidatorsProvider } from "calidation";
import { extraValidators } from "./utils/validators";
import { Locale, setLocaleFromUrl } from "./utils/locale";
import { injectDecoratorClientSide } from "@navikt/nav-dekoratoren-moduler";
import { initAmplitude } from "./utils/amplitude";

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

const messages: { [key in Locale]: any } = { nb: msgsNb, en: msgsEn };

const init = async () => {
  if (process.env.NODE_ENV === "development") {
    await import("./clients/apiMock").then(({ setUpMock }) => setUpMock());
    injectDecoratorClientSide({
      env: "localhost",
      port: 8100,
    });
  } else {
    initAmplitude();
  }

  ReactDOM.render(
    <StoreProvider initialState={initialState} reducer={reducer}>
      <RenderApp />
    </StoreProvider>,
    document.getElementById("app")
  );
  serviceWorker.unregister();
};

const RenderApp = () => {
  const [{ locale }, dispatch] = useStore();

  useEffect(() => {
    setLocaleFromUrl(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ValidatorsProvider validators={extraValidators}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <App />
      </IntlProvider>
    </ValidatorsProvider>
  );
};

init();
