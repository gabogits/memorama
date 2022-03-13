import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import { MAX_SCORE, MAX_TIME_GAME } from "../constants/utils";
import { calculateScore } from "../helpers/calculateScore";
export const useGame = (
  numberPlayers,
  dataPlayers,
  arrayImages,
  handleStart,
  handlePause,
  handleReset,
  timer
) => {
  const isMounted = useRef(true);
  const [cardsGame, setCardsGame] = useState([]);
  const [endGame, setEndGame] = useState(false);
  const [score, setScore] = useState(null);

  const [move, setMove] = useState({
    playerMove: dataPlayers[0],
    cardsMove: [],
  });
  const { playerMove, cardsMove } = move;
  const [gameData, setGameData] = useState([]);

  const handleCardFlip = (id, parid, active) => {
    const cardAlreadyFlipped = cardsMove.find((elem) => elem.id === id);
    if (!cardAlreadyFlipped && active && cardsMove.length < 2) {
      setMove({
        ...move,
        cardsMove: [...cardsMove, { parid, id }],
      });

      const newCardsGame = cardsGame.map((item) =>
        item.nanoId === id ? { ...item, flipped: true } : item
      );

      setCardsGame(newCardsGame);
    }
  };

  const initGame = () => {
    handleReset();
    setEndGame(false);
    const cardsGame = [...arrayImages, ...arrayImages]
      .map((item) => {
        return {
          ...item,
          nanoId: nanoid(10),
          flipped: false,
          active: true,
        };
      })
      .sort(() => Math.random() - 0.5);

    setCardsGame(cardsGame);

    setMove({
      playerMove: dataPlayers[0],
      cardsMove: [],
    });

    setGameData(
      dataPlayers.map((item) => {
        return {
          ...item,
          score: 0,
        };
      })
    );
    setScore(null);
    handleStart();
  };

  const cleanGameBoard = () => {
    let newCardsGame;
    let newDataGame;

    setTimeout(() => {
      let playerMoveData;
      if (cardsMove[0].parid === cardsMove[1].parid) {
        newCardsGame = cardsGame.map((item) =>
          item.parid === cardsMove[0].parid ? { ...item, active: false } : item
        );
        newDataGame = gameData.map((item) =>
          item.id === playerMove.id ? { ...item, score: item.score + 1 } : item
        );

        setGameData(newDataGame);

        const activeCards = newCardsGame.filter((item) => item.active);
        if (activeCards.length === 0) {
          handlePause();
          setScore(calculateScore(MAX_TIME_GAME, timer, MAX_SCORE));
          setEndGame(true);
        }
      } else {
        newCardsGame = cardsGame.map((item) =>
          item.flipped ? { ...item, flipped: false } : item
        );
        if (numberPlayers === 2) {
          playerMoveData = {
            playerMove: dataPlayers.find((item) => item.id !== playerMove.id),
          };
        }
      }
      setMove({
        ...move,
        cardsMove: [],
        ...playerMoveData,
      });

      setCardsGame(newCardsGame);
    }, 1200);
  };
  useEffect(() => {
    if (isMounted.current) {
      initGame();
    }
    return () => {
      handlePause();
      handleReset();
      isMounted.current = false;
    };
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (isMounted.current && cardsMove.length === 2) {
      cleanGameBoard();
    }
    // eslint-disable-next-line
  }, [cardsMove]);

  return {
    playerMove,
    cardsGame,
    gameData,
    endGame,
    score,
    initGame,
    handleCardFlip,
  };
};
