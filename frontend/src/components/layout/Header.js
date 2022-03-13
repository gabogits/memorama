import React, { useContext } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import GameContext from "../../context/GameContext";
import { types } from "../../types/types";
const Header = () => {
  const history = useHistory();
  const {
    state: { dataPlayers },
    dispatch,
  } = useContext(GameContext);
  const endSesionGame = (e) => {
    e.preventDefault();

    dispatch({
      type: types.RESET,
      payload: {
        numberPlayers: 0,
        dataPlayers: [],
        arrayImages: [],
        category: null,
      },
    });
    if (history.location.pathname) {
      history.push("/");
    }
  };

  return (
    <header>
      <div className=" container container-header">
        <div className="logo">
          <figure>
            <Link to="/">
              <span className="logo-desk">MEMORAMA</span>
              <span className="logo-mobile">M</span>{" "}
            </Link>
          </figure>
        </div>
        <nav>
          <div className="nav-left"></div>
          <div className="nav-right">
            <div className="nav-list">
              <ul>
                <li>
                  <button onClick={endSesionGame}>Inicio</button>
                </li>
                {dataPlayers.length > 0 && (
                  <>
                    <li>
                      <NavLink activeClassName="active" exact to="/tema">
                        Tema
                      </NavLink>
                    </li>
                    <li>
                      <NavLink activeClassName="active" exact to="/juego">
                        Juego
                      </NavLink>
                    </li>
                  </>
                )}

                <li>
                  <NavLink activeClassName="active" exact to="/ranking">
                    Ranking
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
