import React from "react";
import { Route, Switch } from "react-router";
import NotFound from "../404/404";
import ChatForside from "./ChatForside";
import { chatTemaLenker } from "./data/chatTemaLenker";
import ChatTemaside from "./ChatTemaside";
import { ChatTema } from "../../types/kanaler";
import { localePath, validLocales } from "../../utils/locale";
import { paths } from "../../Config";

const ChatRouter = () => {
  return (
    <Switch>
      {validLocales.flatMap(locale => [
        (
          <Route
            exact={true}
            path={localePath(paths.chat.forside, locale)}
            component={ChatForside}
            key={locale}
          />
        ),
        chatTemaLenker.map(lenke => (
          <Route
            exact={true}
            path={localePath(lenke.url, locale)}
            render={() => <ChatTemaside chatTema={lenke.tema as ChatTema} path={lenke.url} />}
            key={lenke.tema}
          />
        ))
      ])}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default ChatRouter;
