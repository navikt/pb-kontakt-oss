import React from "react";
import { Normaltekst, Sidetittel, Undertittel } from "nav-frontend-typografi";
import { lenker } from "./FrontpageLenker";
import Lenkepanel from "nav-frontend-lenkepanel";

const Frontpage = () => (
  <div className="frontpage">
    <header className="frontpage__introduksjon">
      <div className="frontpage__sidetittel">
        <Sidetittel>Tilbakemeldinger til NAV</Sidetittel>
      </div>
    </header>
    <div className="frontpage__content">
      {lenker.map((lenke, key) => (
        <Lenkepanel href={lenke.lenke} tittelProps="sidetittel" border>
          <div className="lenke__container" key={key}>
            <div className="lenke__tittel">
              <Undertittel>{lenke.tittel}</Undertittel>
            </div>
            <div className="lenke__beskrivelse">
              <Normaltekst>{lenke.beskrivelse}</Normaltekst>
            </div>
          </div>
        </Lenkepanel>
      ))}
    </div>
  </div>
);

export default Frontpage;
