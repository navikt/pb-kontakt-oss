import React from "react";
import ReactMetaTags from "react-meta-tags";
import { Systemtittel } from "nav-frontend-typografi";
import RouterLenke from "../../components/routerlenke/RouterLenke";
import { forsidePath } from "../../Config";
import { FormattedMessage } from "react-intl";

const NotFound = () => (
    <>
        <ReactMetaTags>
            <meta name="robots" content="noindex" />
        </ReactMetaTags>
        <div className="notfound__container">
            <Systemtittel><FormattedMessage id={"feil.404"}/></Systemtittel>
            <RouterLenke href={forsidePath}><FormattedMessage id={"feil.lenke"}/></RouterLenke>
        </div>
    </>
);
export default NotFound;
