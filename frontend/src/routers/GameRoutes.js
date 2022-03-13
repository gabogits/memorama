import React from "react";
import { Switch, Route } from "react-router-dom";
import Category from "../pages/Category";
import Game from "../pages/Game";

export const GameRoutes = () => {
  return (
    <Switch>
      <Route exact path="/tema" component={Category} />
      <Route exact path="/juego" component={Game} />
    </Switch>
  );
};
