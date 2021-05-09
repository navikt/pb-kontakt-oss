import { useEffect } from "react";
import { forsidePath } from "Config";
import { setBreadcrumbs } from "@navikt/nav-dekoratoren-moduler";
import { setAvailableLanguages } from "@navikt/nav-dekoratoren-moduler";
import { onBreadcrumbClick } from "@navikt/nav-dekoratoren-moduler";
import { useHistory, useLocation } from "react-router-dom";
import { onLanguageSelect } from "@navikt/nav-dekoratoren-moduler";
import { Locale, setNewLocale } from "utils/locale";
import { useStore } from "providers/Provider";
import { useIntl } from "react-intl";

type Props = {
  showLanguageSelector?: boolean;
};

export const DecoratorWidgets = ({ showLanguageSelector = true }: Props) => {
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
    if (!showLanguageSelector) {
      return;
    }

    const subSegments = pathname
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
  }, [pathname, showLanguageSelector]);

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
  }, [locale, formatMessage, pathname]);

  return null;
};

export default DecoratorWidgets;
