import React, { useState } from "react";
import VisMer from "./FAQLenkerVisMer";
import { FormattedMessage } from "react-intl";
import IkonPanel from "../../../components/ikonpanel/IkonPanel";
import ikon from "assets/forside-faq-ikon.svg";
import RouterLenke from "../../../components/routerlenke/RouterLenkeMedChevron";
import { useStore } from "../../../providers/Provider";
import { lenkerFAQDefault } from "./FAQDefaultLenker";
import { NavContentLoader } from "../../../components/content-loader/NavContentLoader";
import { useLocaleString } from "../../../utils/sanity/useLocaleString";

const FAQ = () => {
  const [visFlereFAQ, settVisFlereFAQ] = useState(false);
  const toggleVisFlereFAQ = () => settVisFlereFAQ(!visFlereFAQ);
  const visElementer = 3;

  const [{ faq }] = useStore();
  const localeString = useLocaleString();

  const lenkerFraSanity = faq.faqLenker.length > 0 &&
    faq.faqLenker.map(lenke =>
      ({ lenke: localeString(lenke.lenke), tekst: localeString(lenke.tittel) }));

  const lenkerFAQ = lenkerFraSanity || lenkerFAQDefault;

  const tittel = <FormattedMessage id={"faq.intro"} />;

  return (
    <IkonPanel ikon={ikon} tittel={tittel} className={"faq"}>
      {faq.isLoaded ? (
        <>
          {lenkerFAQ
            .slice(0, visFlereFAQ ? lenkerFAQ.length : visElementer)
            .map(({ lenke, tekst }, index) => {
              return (
                <RouterLenke
                  href={lenke}
                  className={"lenke__avstand-under"}
                  isExternal={true}
                  key={index}
                >
                  {lenkerFraSanity ? tekst : <FormattedMessage id={tekst} />}
                </RouterLenke>
              );
            })
          }
          {lenkerFAQ.length > visElementer && (
            <VisMer visFlere={visFlereFAQ} onClick={toggleVisFlereFAQ} />
          )}
        </>
      ) : <NavContentLoader lines={6} />}
    </IkonPanel>
  );
};

export default FAQ;
