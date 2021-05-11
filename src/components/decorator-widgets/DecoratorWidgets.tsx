import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useIntl } from "react-intl";
import { useStore } from "providers/Provider";
import { Locale, setNewLocale } from "utils/locale";
import { forsidePath } from "Config";
import {
  onBreadcrumbClick,
  onLanguageSelect,
  setAvailableLanguages,
  setBreadcrumbs,
} from "@navikt/nav-dekoratoren-moduler";

export const DecoratorWidgets = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  const [, dispatch] = useStore();
  const { locale, formatMessage } = useIntl();

  onLanguageSelect((breadcrumb) => {
    setNewLocale(breadcrumb.locale as Locale, dispatch);
  });

  onBreadcrumbClick((breadcrumb) => {
    history.push(breadcrumb.url);
  });

  // Set languages in decorator
  useEffect(() => {
    const subPath = pathname.replace(`${forsidePath}/${locale}`, "");

    if (subPath.startsWith("/samegiella")) {
      setAvailableLanguages([]);
      return;
    }

    const languages = [
      {
        locale: "nb",
        url: `${forsidePath}/nb/${subPath}`,
        handleInApp: true,
      },
      {
        locale: "en",
        url: `${forsidePath}/en/${subPath}`,
        handleInApp: true,
      },
    ];

    setAvailableLanguages(languages);
  }, [pathname, locale]);

  // Set breadcrumbs in decorator
  useEffect(() => {
    const basePath = `${forsidePath}/${locale}`;

    const baseBreadcrumb = {
      url: basePath,
      title: formatMessage({ id: "breadcrumb.base" }),
      handleInApp: false,
    };

    const internalBreadcrumbs = pathname
      .replace(basePath, "")
      .split("/")
      .filter((pathSegment) => pathSegment !== "")
      .map((pathSegment, index, pathSegmentArray) => {
        const subPath = pathSegmentArray.slice(0, index + 1).join("/");
        return {
          url: `${forsidePath}/${locale}/${subPath}`,
          title: formatMessage({ id: `breadcrumb.${pathSegment}` }),
          handleInApp: true,
        };
      });

    setBreadcrumbs([baseBreadcrumb, ...internalBreadcrumbs]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
};
