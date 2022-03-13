import { renderHook, act } from "@testing-library/react-hooks";
import { arrayImages } from "../../constants/mocks";
import { useGame } from "../../hooks/useGame";

describe("Pruebas en useGame", () => {
  const handleStart = jest.fn();
  const handlePause = jest.fn();
  const handleReset = jest.fn();
  const data = {
    numberPlayers: 2,
    dataPlayers: [
      { avatar: "witch", id: 1, name: "juan" },
      { avatar: "dracula", id: 2, name: "bety" },
    ],
    arrayImages,
    handleStart,
    handlePause,
    handleReset,
    timer: 0,
  };
  test("Debe de emepzar el juego con los valores por default -initGame-", () => {
    const { result } = renderHook(() =>
      useGame(
        data.numberPlayers,
        data.dataPlayers,
        data.arrayImages,
        data.handleStart,
        data.handlePause,
        data.handleReset,
        data.timer
      )
    );

    const {
      playerMove,
      cardsGame,
      gameData,
      endGame,
      score,
      initGame,
      handleCardFlip,
    } = result.current;

    expect(playerMove).toEqual({ avatar: "witch", id: 1, name: "juan" });
    const activeCards = cardsGame.filter((item) => item.active === true);
    const flippedCards = cardsGame.filter((item) => item.flipped === true);

    expect(activeCards.length).toBe(20);
    expect(flippedCards.length).toBe(0);
    expect(gameData).toEqual([
      { avatar: "witch", id: 1, name: "juan", score: 0 },
      { avatar: "dracula", id: 2, name: "bety", score: 0 },
    ]);
    expect(endGame).toBe(false);
    expect(score).toBe(null);
    expect(typeof initGame).toEqual("function");
    expect(typeof handleCardFlip).toEqual("function");
    expect(handleStart).toHaveBeenCalledTimes(1);
    expect(handleReset).toHaveBeenCalledTimes(1);
  });

  test("girar una tarjeta", () => {
    const { result } = renderHook(() =>
      useGame(
        data.numberPlayers,
        data.dataPlayers,
        data.arrayImages,
        data.handleStart,
        data.handlePause,
        data.handleReset,
        data.timer
      )
    );

    const selectAPair = result.current.cardsGame.filter(
      (item) => item.parid === "46TvM-BVrRI"
    );

    act(() => {
      result.current.handleCardFlip(selectAPair[0].nanoId, "46TvM-BVrRI", true);
    });
    const flippedCard = result.current.cardsGame.filter(
      (item) => item.nanoId === selectAPair[0].nanoId
    );

    expect(flippedCard[0].flipped).toBe(true);
    expect(result.current.playerMove).toEqual({
      avatar: "witch",
      id: 1,
      name: "juan",
    });
  });
  test("evitar que se gire la misma  tarjeta", async () => {
    const { result } = renderHook(() =>
      useGame(
        data.numberPlayers,
        data.dataPlayers,
        data.arrayImages,
        data.handleStart,
        data.handlePause,
        data.handleReset,
        data.timer
      )
    );

    const selectAPair = result.current.cardsGame.filter(
      (item) => item.parid === "46TvM-BVrRI"
    );

    act(() => {
      result.current.handleCardFlip(selectAPair[0].nanoId, "46TvM-BVrRI", true);
    });

    act(() => {
      result.current.handleCardFlip(selectAPair[0].nanoId, "46TvM-BVrRI", true);
    });
    const flippedCard = result.current.cardsGame.filter(
      (item) => item.nanoId === selectAPair[0].nanoId
    );

    expect(flippedCard[0].flipped).toBe(true);
    expect(result.current.playerMove).toEqual({
      avatar: "witch",
      id: 1,
      name: "juan",
    });
    expect(result.current.playerMove).toEqual({
      avatar: "witch",
      id: 1,
      name: "juan",
    });
    expect(result.current.score).toBe(null);
  });

  test("girar dos tarjetas iguales", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useGame(
        data.numberPlayers,
        data.dataPlayers,
        data.arrayImages,
        data.handleStart,
        data.handlePause,
        data.handleReset,
        data.timer
      )
    );

    const selectAPair = result.current.cardsGame.filter(
      (item) => item.parid === "46TvM-BVrRI"
    );

    act(() => {
      result.current.handleCardFlip(selectAPair[0].nanoId, "46TvM-BVrRI", true);
    });

    act(() => {
      result.current.handleCardFlip(selectAPair[1].nanoId, "46TvM-BVrRI", true);
    });
    await waitForNextUpdate({ timeout: 1200 });

    const flippedCards = result.current.cardsGame.filter(
      (item) => item.parid === "46TvM-BVrRI"
    );

    expect(flippedCards[0].flipped).toBe(true);
    expect(flippedCards[1].flipped).toBe(true);
    expect(flippedCards[0].active).toBe(false);
    expect(flippedCards[1].active).toBe(false);
    expect(result.current.playerMove).toEqual({
      avatar: "witch",
      id: 1,
      name: "juan",
    });
    expect(result.current.gameData).toEqual([
      { avatar: "witch", id: 1, name: "juan", score: 1 },
      { avatar: "dracula", id: 2, name: "bety", score: 0 },
    ]);
  });

  test("girar dos tarjetas diferentes", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useGame(
        data.numberPlayers,
        data.dataPlayers,
        data.arrayImages,
        data.handleStart,
        data.handlePause,
        data.handleReset,
        data.timer
      )
    );

    const selectACard = result.current.cardsGame.filter(
      (item) => item.parid === "46TvM-BVrRI"
    );
    const selectOtherCard = result.current.cardsGame.filter(
      (item) => item.parid !== "46TvM-BVrRI"
    );

    act(() => {
      result.current.handleCardFlip(selectACard[0].nanoId, "46TvM-BVrRI", true);
    });

    act(() => {
      result.current.handleCardFlip(
        selectOtherCard[0].nanoId,
        selectOtherCard[0].parid,
        true
      );
    });
    await waitForNextUpdate({ timeout: 1200 });

    const flippedCardOne = result.current.cardsGame.filter(
      (item) => item.nanoId === selectACard[0].nanoId
    );
    const flippedCardTwo = result.current.cardsGame.filter(
      (item) => item.nanoId === selectOtherCard[0].nanoId
    );

    expect(flippedCardOne[0].flipped).toBe(false);
    expect(flippedCardTwo[0].flipped).toBe(false);
    expect(flippedCardOne[0].active).toBe(true);
    expect(flippedCardOne[0].active).toBe(true);
    expect(result.current.playerMove).toEqual({
      avatar: "dracula",
      id: 2,
      name: "bety",
    });
    expect(result.current.gameData).toEqual([
      { avatar: "witch", id: 1, name: "juan", score: 0 },
      { avatar: "dracula", id: 2, name: "bety", score: 0 },
    ]);
  });

  test("no debe permitir girar tres tarjetas ", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useGame(
        data.numberPlayers,
        data.dataPlayers,
        data.arrayImages,
        data.handleStart,
        data.handlePause,
        data.handleReset,
        data.timer
      )
    );

    const selectACard = result.current.cardsGame.filter(
      (item) => item.parid === "46TvM-BVrRI"
    );
    const selectOtherCard = result.current.cardsGame.filter(
      (item) => item.parid !== "46TvM-BVrRI"
    );

    act(() => {
      result.current.handleCardFlip(selectACard[0].nanoId, "46TvM-BVrRI", true);
    });

    act(() => {
      result.current.handleCardFlip(
        selectOtherCard[0].nanoId,
        selectOtherCard[0].parid,
        true
      );
    });
    act(() => {
      result.current.handleCardFlip(
        selectOtherCard[1].nanoId,
        selectOtherCard[1].parid,
        true
      );
    });
    await waitForNextUpdate({ timeout: 1200 });

    const flippedCardOne = result.current.cardsGame.filter(
      (item) => item.nanoId === selectACard[0].nanoId
    );
    const flippedCardTwo = result.current.cardsGame.filter(
      (item) => item.nanoId === selectOtherCard[0].nanoId
    );

    expect(flippedCardOne[0].flipped).toBe(false);
    expect(flippedCardTwo[0].flipped).toBe(false);
    expect(flippedCardOne[0].active).toBe(true);
    expect(flippedCardOne[0].active).toBe(true);
    expect(result.current.playerMove).toEqual({
      avatar: "dracula",
      id: 2,
      name: "bety",
    });
    expect(result.current.gameData).toEqual([
      { avatar: "witch", id: 1, name: "juan", score: 0 },
      { avatar: "dracula", id: 2, name: "bety", score: 0 },
    ]);
  });

  test("cuando giran dos tarjetas diferentes no deberia cambiar el turno si solo hay un jugador", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useGame(
        1,
        [{ avatar: "witch", id: 1, name: "juan" }],
        data.arrayImages,
        data.handleStart,
        data.handlePause,
        data.handleReset,
        data.timer
      )
    );

    const selectACard = result.current.cardsGame.filter(
      (item) => item.parid === "46TvM-BVrRI"
    );
    const selectOtherCard = result.current.cardsGame.filter(
      (item) => item.parid !== "46TvM-BVrRI"
    );

    act(() => {
      result.current.handleCardFlip(selectACard[0].nanoId, "46TvM-BVrRI", true);
    });

    act(() => {
      result.current.handleCardFlip(
        selectOtherCard[0].nanoId,
        selectOtherCard[0].parid,
        true
      );
    });
    await waitForNextUpdate({ timeout: 1200 });

    const flippedCardOne = result.current.cardsGame.filter(
      (item) => item.nanoId === selectACard[0].nanoId
    );
    const flippedCardTwo = result.current.cardsGame.filter(
      (item) => item.nanoId === selectOtherCard[0].nanoId
    );

    expect(flippedCardOne[0].flipped).toBe(false);
    expect(flippedCardTwo[0].flipped).toBe(false);
    expect(flippedCardOne[0].active).toBe(true);
    expect(flippedCardOne[0].active).toBe(true);
    expect(result.current.playerMove).toEqual({
      avatar: "witch",
      id: 1,
      name: "juan",
    });
    expect(result.current.gameData).toEqual([
      { avatar: "witch", id: 1, name: "juan", score: 0 },
    ]);
  });
  test("cuando giran el ultimo par tarjetas se termina el juego muestra el score y se detiene el tiempo", async () => {
    const selectAPair = data.arrayImages.filter(
      (item) => item.parid === "46TvM-BVrRI"
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useGame(
        data.numberPlayers,
        data.dataPlayers,
        selectAPair,
        data.handleStart,
        data.handlePause,
        data.handleReset,
        data.timer
      )
    );

    act(() => {
      result.current.handleCardFlip(
        result.current.cardsGame[0].nanoId,
        "46TvM-BVrRI",
        true
      );
    });

    act(() => {
      result.current.handleCardFlip(
        result.current.cardsGame[1].nanoId,
        "46TvM-BVrRI",
        true
      );
    });

    await waitForNextUpdate({ timeout: 1200 });
    expect(handlePause).toHaveBeenCalledTimes(1);
    expect(result.current.endGame).toBe(true);
    expect(result.current.score).toBe(10000);
    expect(result.current.gameData).toEqual([
      { avatar: "witch", id: 1, name: "juan", score: 1 },
      { avatar: "dracula", id: 2, name: "bety", score: 0 },
    ]);
  });
});
