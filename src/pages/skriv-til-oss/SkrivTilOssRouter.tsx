import React from "react";
import { Route, Switch } from "react-router";
import { paths } from "../../Config";

import SkrivTilOssForside from "./sider/SkrivTilOssForside";
import TemaHjelpemidler from "./sider/TemaHjelpemidler";
import NotFound from "../404/404";
import { localePath, validLocales } from "../../utils/locale";

const SkrivTilOssRouter = () => {
  return (
    <Switch>
      {validLocales.flatMap(locale => [
        (
          <Route
            exact={true}
            path={localePath(paths.skrivTilOss.forside, locale)}
            component={SkrivTilOssForside}
          />
        ),
        (
          <Route
            exact={true}
            path={localePath(paths.skrivTilOss.hjelpemidler, locale)}
            component={TemaHjelpemidler}
          />
        )
      ])}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default SkrivTilOssRouter;
