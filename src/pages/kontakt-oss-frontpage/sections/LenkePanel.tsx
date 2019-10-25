import React from "react";
import eksterneLenker from "./LenkePanelLenker";
import Box from "../../../components/box/Box";
import { Undertittel } from "nav-frontend-typografi";
import { Link } from "react-router-dom";

const LenkePanel = () => {
  return (
    <>
      {eksterneLenker.map(link => (
        <Box>
          <>
            <div className={"box__section-title"}>
              <Undertittel className="box__title">{link.tittel}</Undertittel>
            </div>
            <div className={"box__section-description"}>
              <span dangerouslySetInnerHTML={{ __html: link.beskrivelse }} />
            </div>
            {link.url && link.lenkeTekst && (
              <>
                {link.external ? (
                  <a className="lenke" href={link.url}>
                    {link.lenkeTekst}
                  </a>
                ) : (
                  <Link className="lenke" to={link.url}>
                    {link.lenkeTekst}
                  </Link>
                )}
              </>
            )}
          </>
        </Box>
      ))}
    </>
  );
};

/*
  <LinkBox
    id={link.id}
    key={link.id}
    icon={link.icon}
    tittel={link.tittel}
    beskrivelse={link.beskrivelse}
    lenkeTekst={link.lenkeTekst}
    to={link.url}
    component={link.type as "Link" | "a"}
  />
 */
export default LenkePanel;