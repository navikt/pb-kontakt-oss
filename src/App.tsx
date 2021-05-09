import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Tilbakemeldinger from "./pages/tilbakemeldinger/Tilbakemeldinger";
import Ros from "./pages/tilbakemeldinger/ros-til-nav/Ros";
import PageNotFound from "./pages/404/404";
import FeilOgMangler from "./pages/tilbakemeldinger/feil-og-mangler/FeilOgMangler";
import {
  fetchAlerts,
  fetchAuthInfo,
  fetchFodselsnr,
  fetchKontaktInfo,
  fetchTimeoutMs,
  timeoutPromise,
} from "./clients/apiClient";
import { useStore } from "./providers/Provider";
import { AuthInfo } from "./types/authInfo";
import { HTTPError } from "./components/error/Error";
import ServiceKlage from "./pages/tilbakemeldinger/service-klage/ServiceKlage";
import ServiceKlageLogin from "./pages/tilbakemeldinger/service-klage/ServiceKlageLogin";
import { KontaktInfo } from "./types/kontaktInfo";
import { Fodselsnr } from "./types/fodselsnr";
import ScrollToTop from "./components/scroll-to-top/ScrollToTop";
import BestillingAvSamtale from "./pages/samisk/bestilling-av-samtale/BestillingAvSamtale";
import { paths } from "./Config";
import FinnNavKontorPage from "./pages/finn-nav-kontor/FinnNavKontorPage";
import { Alert } from "./utils/sanity/endpoints/alert";
import { localePath, validLocales } from "./utils/locale";

const App = () => {
  const [{ auth }, dispatch] = useStore();

  useEffect(() => {
    if (!auth.authenticated) {
      fetchAuthInfo()
        .then((authInfo: AuthInfo) => {
          dispatch({ type: "SETT_AUTH_RESULT", payload: authInfo });
          if (authInfo.authenticated) {
            fetchKontaktInfo()
              .then((kontaktInfo: KontaktInfo) =>
                dispatch({
                  type: "SETT_KONTAKT_INFO_RESULT",
                  payload: kontaktInfo,
                })
              )
              .catch((error: HTTPError) => console.error(error));
            fetchFodselsnr()
              .then((fodselsnr: Fodselsnr) =>
                dispatch({
                  type: "SETT_FODSELSNR",
                  payload: fodselsnr,
                })
              )
              .catch((error: HTTPError) => console.error(error));
          }
        })
        .catch((error: HTTPError) => console.error(error));
    }

    Promise.race<any>([
      fetchAlerts(),
      timeoutPromise(fetchTimeoutMs, "Fetching alerts failed!"),
    ])
      .then((alerts: Array<Alert>) => {
        dispatch({
          type: "SETT_ALERTS",
          payload: alerts,
        });
      })
      .catch((err) => {
        dispatch({ type: "SETT_ALERTS_FETCH_FAILED" });
        console.error(err);
      });
  }, []);

  let key = 0;

  return (
    <>
      <BrowserRouter>
        <ScrollToTop>
          <Switch>
            {validLocales.flatMap((locale) => [
              <Route
                exact={true}
                path={localePath(paths.finnDittNavKontorUinnlogget, locale)}
                component={FinnNavKontorPage}
                key={key++}
              />,
              <Route
                exact={true}
                path={localePath(paths.tilbakemeldinger.forside, locale)}
                component={Tilbakemeldinger}
                key={key++}
              />,
              <Route
                exact={true}
                path={localePath(
                  paths.tilbakemeldinger.serviceklage.login,
                  locale
                )}
                component={ServiceKlageLogin}
                key={key++}
              />,
              <Route
                exact={true}
                path={localePath(
                  paths.tilbakemeldinger.serviceklage.form,
                  locale
                )}
                component={ServiceKlage}
                key={key++}
              />,
              <Route
                exact={true}
                path={localePath(paths.tilbakemeldinger.rostilnav, locale)}
                component={Ros}
                key={key++}
              />,
              <Route
                exact={true}
                path={localePath(paths.tilbakemeldinger.feilogmangler, locale)}
                component={FeilOgMangler}
                key={key++}
              />,
              <Route
                exact={true}
                path={localePath(paths.samegiella.samtale, locale)}
                component={BestillingAvSamtale}
                key={key++}
              />,
            ])}
            <Route component={PageNotFound} />
          </Switch>
        </ScrollToTop>
      </BrowserRouter>
    </>
  );
};

export default App;
