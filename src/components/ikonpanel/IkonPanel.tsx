import React from "react";

import { Systemtittel } from "nav-frontend-typografi";
import Panel from "nav-frontend-paneler";

type Props = {
  ikon?: string;
  tittel: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  id?: string;
};

const cssPrefix = "ikonpanel";

const IkonPanel = ({ ikon, tittel, children, className, id }: Props) => {
  return (
    <Panel
      className={`${cssPrefix}${className ? ` ${className}` : ""}`}
      id={id}
    >
      <div>
        {ikon && (
          <div className={`${cssPrefix}__ikon-container`}>
            <img src={ikon} alt="" className={`${cssPrefix}__ikon`} />
          </div>
        )}
      </div>
      <div className={`${cssPrefix}__innhold`}>
        <Systemtittel className={`${cssPrefix}__innhold-header`}>
          {tittel}
        </Systemtittel>
        <div className={`${cssPrefix}__innhold-body`}>{children}</div>
      </div>
    </Panel>
  );
};

export default IkonPanel;
