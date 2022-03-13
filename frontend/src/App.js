import React, { useEffect, useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GameContext from "./context/GameContext";
import { GameReducer } from "./context/GameReducer";
import { PrivateRoute } from "./routers/PrivateRoute";
import { PublicRoute } from "./routers/PublicRoute";
import { GameRoutes } from "./routers/GameRoutes";
import Player from "./pages/Player";
import Ranking from "./pages/Ranking";

const init = () => {
  let players = localStorage.getItem("dataPlayers");
  players = players ? JSON.parse(players) : [];
  return {
    numberPlayers: players ? players.length : 0,
    dataPlayers: players ? players : [],
    arrayImages: [],
    category: null,
  };
};
const App = () => {
  const [state, dispatch] = useReducer(GameReducer, {}, init);
  const { dataPlayers } = state;

  useEffect(() => {
    localStorage.setItem("dataPlayers", JSON.stringify(dataPlayers));
  }, [dataPlayers]);
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      <Router>
        <Switch>
          <Route exact path="/ranking" component={Ranking} />
          <PublicRoute
            exact
            path="/"
            component={Player}
            dataPlayers={dataPlayers.length}
          />
          <PrivateRoute
            path="/"
            component={GameRoutes}
            dataPlayers={dataPlayers.length}
          />
        </Switch>
      </Router>
    </GameContext.Provider>
  );
};

export default App;
