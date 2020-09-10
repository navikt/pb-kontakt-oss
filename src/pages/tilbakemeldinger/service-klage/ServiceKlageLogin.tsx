import React from "react";
import { useStore } from "providers/Provider";
import { Link, Redirect } from "react-router-dom";
import Environment from "Environments";
import { useLocalePaths } from "Config";
import Box from "components/box/Box";
import Header from "components/header/Header";
import { FormattedMessage, useIntl } from "react-intl";
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
          id: "tilbakemeldinger.serviceklage.login.tittel",
        })}
      />
      <Box
        tittel={intl.formatMessage({
          id: "tilbakemeldinger.serviceklage.login.overskrift",
        })}
        containerClassName={"serviceKlage__login-container"}
      >
        <div className="serviceKlage__login-info">
          <FormattedMessage
            id={"tilbakemeldinger.serviceklage.login.beskrivelse"}
            values={{ br: () => <br /> }}
          />
        </div>
        <div className="tb__knapper">
          <div className={"tb__knapp"}>
            <a
              className="lenkeknapp knapp knapp--hoved"
              href={`${loginUrl}?redirect=${window.location.href}`}
            >
              <FormattedMessage
                id={"tilbakemeldinger.serviceklage.login.knapp"}
              />
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
