import React from "react";
import { useStore } from "providers/Provider";
import { Hovedknapp } from "nav-frontend-knapper";
import { Link, Redirect } from "react-router-dom";
import Environment from "Environments";
import { useLocalePaths } from "Config";
import Box from "components/box/Box";
import Header from "components/header/Header";
import { FormattedHTMLMessage, FormattedMessage, useIntl } from "react-intl";
import Topplinje from "../../../components/topp-linje/ToppLinje";
import { MetaTags } from "../../../components/metatags/MetaTags";

const { loginUrl } = Environment();

const ServiceKlageLogin = () => {
  const [{ auth }] = useStore();
  const intl = useIntl();
  const paths = useLocalePaths();

  if (auth.authenticated) {
    return <Redirect to={paths.tilbakemeldinger.serviceklage.form} />;
  }

  return (
    <div className="pagecontent">
      <Topplinje />
      <MetaTags
        titleId={"tilbakemeldinger.serviceklage.login.tittel"}
        path={paths.tilbakemeldinger.serviceklage.login}
      />
      <Header
        title={intl.formatMessage({
          id: "tilbakemeldinger.serviceklage.login.tittel"
        })}
      />
      <Box
        tittel={intl.formatMessage({
          id: "tilbakemeldinger.serviceklage.login.overskrift"
        })}
        containerClassName={"serviceKlage__login-container"}
      >
        <div className="serviceKlage__login-info">
          <FormattedHTMLMessage
            id={"tilbakemeldinger.serviceklage.login.beskrivelse"}
          />
        </div>
        <div className="tb__knapper">
          <div className={"tb__knapp"}>
            <a href={`${loginUrl}?redirect=${window.location.href}`}>
              <Hovedknapp>
                <FormattedMessage
                  id={"tilbakemeldinger.serviceklage.login.knapp"}
                />
              </Hovedknapp>
            </a>
          </div>
          <div className={"tb__knapp serviceKlage__login-lenke"}>
            <Link
              className={"lenke"}
              to={paths.tilbakemeldinger.serviceklage.form}
            >
              <FormattedMessage
                id={"tilbakemeldinger.serviceklage.login.knapp.fortsettuten"}
              />
            </Link>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default ServiceKlageLogin;
