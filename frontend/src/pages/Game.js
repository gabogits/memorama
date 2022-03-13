import React, { useState, useEffect, useContext } from "react";

import Card from "../components/Card";
import Timer from "../components/Timer";
import useTimer from "../hooks/useTimer";

import { useGame } from "../hooks/useGame";
import GameContext from "../context/GameContext";
import { types } from "../types/types";
import { useHistory } from "react-router-dom";
import Score from "../components/Score";
import Layout from "../components/layout/Layout";

const Game = () => {
  const {
    state: { numberPlayers, dataPlayers, arrayImages },
    dispatch,
  } = useContext(GameContext);
  const { timer, handleStart, handlePause, handleReset } = useTimer(0);
  const history = useHistory();

  const {
    playerMove,
    cardsGame,
    gameData,
    endGame,
    score,
    initGame,
    handleCardFlip,
  } = useGame(
    numberPlayers,
    dataPlayers,
    arrayImages,
    handleStart,
    handlePause,
    handleReset,
    timer
  );
  const [loading, setLoading] = useState(false);

  const repeatGame = async (e) => {
    e.preventDefault();
    initGame();
  };

  const endSesionGame = async (e) => {
    e.preventDefault();
    handlePause();

    dispatch({
      type: types.RESET,
      payload: {
        numberPlayers: 0,
        dataPlayers: [],
        arrayImages: [],
        category: null,
      },
    });
    history.push("/");
  };

  useEffect(() => {
    if (arrayImages.length === 0) {
      history.push("/tema");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <div className="header-game">
        <div className="header-game-container">
          <div className="header-gamedata">
            {gameData.map((item) => (
              <div key={item.id} className="header-gamedata-item">
                <div
                  className={`header-gamedata-avatar ${
                    item.name === playerMove.name && numberPlayers === 2
                      ? "active"
                      : ""
                  }`}
                >
                  <img
                    alt="avatar"
                    src={require(`../assets/images/avatar/${item.avatar}.png`)}
                  />
                </div>
                <div className="header-gamedata-data">
                  {item.name}
                  <br />
                  <strong> {numberPlayers === 2 ? item.score : score}</strong>
                </div>
              </div>
            ))}
          </div>
          <div className="timer-buttons">
            <Timer timer={timer} />
            <div className="container-icon-menu">
              <button
                type="submit"
                className="btn-icon-2 icon-repeat"
                value="enviar"
                onClick={repeatGame}
              ></button>
              <button
                type="submit"
                className="btn-icon-2 icon-endGame"
                value="enviar"
                onClick={endSesionGame}
              ></button>
            </div>
          </div>
        </div>
      </div>
      <div className="cards-board">
        {!endGame ? (
          <div className="cards-list">
            {cardsGame.map((item) => (
              <Card
                active={item.active}
                flipped={item.flipped}
                key={item.nanoId}
                item={item}
                handleFlipCard={handleCardFlip}
              />
            ))}
          </div>
        ) : (
          <div className="buttons-row options-aftergame">
            <button
              name="numberPlayers"
              onClick={endSesionGame}
              className={`btn-primary   btn-size-2 btn-color-2`}
            >
              Terminar juego
            </button>
            <button
              name="numberPlayers"
              onClick={repeatGame}
              className={`btn-primary   btn-size-2 btn-color-2`}
            >
              Repetir juego
            </button>
          </div>
        )}
      </div>

      <Score
        active={endGame}
        gameData={gameData}
        numberPlayers={numberPlayers}
        score={score}
        loading={loading}
        dataPlayers={dataPlayers}
        timer={timer}
        setLoading={setLoading}
      />
    </Layout>
  );
};

export default Game;
