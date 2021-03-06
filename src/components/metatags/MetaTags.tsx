import React, { useEffect } from "react";
import ReactMetaTags from "react-meta-tags";
import { localePath } from "../../utils/locale";
import { useIntl } from "react-intl";
import { useStore } from "../../providers/Provider";
import Environment from "../../Environments";
import { logPageview } from "../../utils/amplitude";

type Props = {
  path: string;
  titleId: string;
  descriptionId?: string;
  children?: JSX.Element;
};

export const MetaTags = ({ path, titleId, descriptionId, children }: Props) => {
  const intl = useIntl();
  const [{ locale }] = useStore();
  const baseUrl = Environment().baseUrl;
  const title = intl.formatMessage({ id: titleId });

  useEffect(() => {
    logPageview(title);
  }, [title]);

  return (
    <ReactMetaTags>
      {titleId && <title>{`${title} - www.nav.no`}</title>}
      {descriptionId && (
        <meta
          name="description"
          content={intl.formatMessage({ id: descriptionId })}
        />
      )}
      {(path || path === "") && (
        <>
          <link
            rel="canonical"
            href={`${baseUrl}${localePath(path, locale)}`}
          />
          <link
            rel="alternate"
            href={`${baseUrl}${localePath(path, "nb")}`}
            hrefLang="nb"
          />
          <link
            rel="alternate"
            href={`${baseUrl}${localePath(path, "nb")}`}
            hrefLang="nn"
          />
          <link
            rel="alternate"
            href={`${baseUrl}${localePath(path, "nb")}`}
            hrefLang="sv"
          />
          <link
            rel="alternate"
            href={`${baseUrl}${localePath(path, "nb")}`}
            hrefLang="da"
          />
          <link
            rel="alternate"
            href={`${baseUrl}${localePath(path, "nb")}`}
            hrefLang="is"
          />
          <link
            rel="alternate"
            href={`${baseUrl}${localePath(path, "nb")}`}
            hrefLang="se"
          />
          <link
            rel="alternate"
            href={`${baseUrl}${localePath(path, "en")}`}
            hrefLang="en"
          />
          <link
            rel="alternate"
            href={`${baseUrl}${localePath(path, "en")}`}
            hrefLang="x-default"
          />
        </>
      )}
      {children}
    </ReactMetaTags>
  );
};
