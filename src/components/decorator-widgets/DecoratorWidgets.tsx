import { useEffect } from "react";
import { forsidePath } from "Config";
import { setBreadcrumbs } from "@navikt/nav-dekoratoren-moduler";
import { setAvailableLanguages } from "@navikt/nav-dekoratoren-moduler";
import { onBreadcrumbClick } from "@navikt/nav-dekoratoren-moduler";
import { useHistory, useLocation } from "react-router-dom";
import { onLanguageSelect } from "@navikt/nav-dekoratoren-moduler";
import { Locale, setNewLocale } from "utils/locale";
import { useStore } from "providers/Provider";
import Environment from "../../Environments";
import { useIntl } from "react-intl";

type BreadcrumbLenke = {
  url: string;
  lenketekstId: string;
  isExternal?: boolean;
};

const getSegmentLenker = (locale: string): Array<BreadcrumbLenke> => {
  const { baseAppPath } = Environment();
  const pathSegments = window.location.pathname
    .replace(/\/person\/kontakt-oss\/*/, "")
    .split("/");

  // fjerner tomt segment ved trailing slash
  if (pathSegments.length > 1 && pathSegments[pathSegments.length - 1] === "") {
    pathSegments.pop();
  }

  return pathSegments.map((segment, index) => {
    const combinedSegments = pathSegments.slice(0, index + 1);
    const segmentPath =
      combinedSegments.length === 1 ? "" : combinedSegments.join("/");

    const url = `${baseAppPath}/${segmentPath}`;
    return {
      url: !url.includes(`${locale}`) ? `${url}${locale}` : url,
      lenketekstId: `breadcrumb.${segment}`,
    };
  });
};

type Props = {
  showLanguageSelector?: boolean;
};

export const DecoratorWidgets = ({ showLanguageSelector = true }: Props) => {
  const location = useLocation();
  const history = useHistory();
  const [, dispatch] = useStore();
  const { formatMessage, locale } = useIntl();

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
  }, [location.pathname]);

  // Set breadcrumbs in decorator
  useEffect(() => {
    const lenker = getSegmentLenker(locale);
    const breadcrumbs = lenker.map((lenke) => ({
      title: formatMessage({ id: lenke.lenketekstId }),
      handleInApp: lenke.url.startsWith("/"),
      url: lenke.url,
    }));

    setBreadcrumbs(breadcrumbs);
  }, [formatMessage, locale]);

  return null;
};

export default DecoratorWidgets;
