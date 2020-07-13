import React from "react";
import { Route, Switch } from "react-router";
import NotFound from "../404/404";
import ChatForside from "./ChatForside";
import { localePath, validLocales } from "../../utils/locale";
import { paths } from "../../Config";

const ChatRouter = () => {
  // Deprecated, should be removed when links in XP are updated
  const themeRoutes = `(/arbeidsgiver|/jobbsoker|/syk|/familie|/ufor|/sosialhjelp|/okonomi|/eures|/aap)?`;
  return (
    <Switch>
      {validLocales.flatMap((locale) => [
        <Route
          exact={true}
          path={`${localePath(paths.chat.forside, locale)}${themeRoutes}`}
          component={ChatForside}
          key={locale}
        />,
      ])}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default ChatRouter;
