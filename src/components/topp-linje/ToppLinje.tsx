import React, { useEffect } from "react";

import Breadcrumbs, { BreadcrumbLenke } from "../breadcrumbs/Breadcrumbs";
import { forsidePath } from "Config";
import { setAvailableLanguages } from "@navikt/nav-dekoratoren-moduler";
import { useHistory, useLocation } from "react-router-dom";
import { onLanguageSelect } from "@navikt/nav-dekoratoren-moduler/dist";
import { useStore } from "providers/Provider";
import { Locale } from "utils/locale";

const baseLenker: Array<BreadcrumbLenke> = [];

export const ToppLinje = () => {
  const location = useLocation();
  const history = useHistory();
  const [, dispatch] = useStore();

  onLanguageSelect((breadcrumb) => {
    dispatch({ type: "SETT_LOCALE", payload: breadcrumb.locale as Locale });
    history.push(breadcrumb.url);
  });

  useEffect(() => {
    const subSegments = location.pathname
      .split(forsidePath)[1]
      .split("/")
      .slice(2)
      .join("/");

    const languages = [
      {
        locale: "nb",
        url: `${forsidePath}/nb/${subSegments}`,
        handleInApp: true,
      },
      {
        locale: "en",
        url: `${forsidePath}/en/${subSegments}`,
        handleInApp: true,
      },
    ];

    setAvailableLanguages(languages);
  }, [location]);

  return (
    <div className={"kontakt-oss-topplinje"}>
      <Breadcrumbs baseLenker={baseLenker} />
    </div>
  );
};

export default ToppLinje;
