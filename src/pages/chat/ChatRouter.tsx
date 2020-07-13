import React from "react";
import { Route, Switch } from "react-router";
import NotFound from "../404/404";
import ChatForside from "./ChatForside";
import { localePath, validLocales } from "../../utils/locale";
import { paths } from "../../Config";

const ChatRouter = () => {
  const themeRoutes = `(/arbeidsgiver|/jobbsoker|/syk|/familie|/ufor|/sosialhjelp|/okonomi|/eures)?`;
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
