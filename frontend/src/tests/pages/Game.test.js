import React from "react";
import { mount } from "enzyme";
import { Router } from "react-router-dom";
import GameContext from "../../context/GameContext";
import "@testing-library/jest-dom";
import { types } from "../../types/types";
import Game from "../../pages/Game";
import { useGame } from "../../hooks/useGame";
import useTimer from "../../hooks/useTimer";
import { arrayImages, mockGameCards } from "../../constants/mocks";
jest.mock("../../hooks/useGame");
jest.mock("../../hooks/useTimer");

describe("Pruebas en <Game />", () => {
  let historyMock = {
    push: jest.fn(),
    replace: jest.fn(),
    location: jest.fn(),
    listen: jest.fn(),
    createHref: jest.fn(),
  };
  const contextValue = {
    dispatch: jest.fn(),
    state: {
      numberPlayers: 2,
      dataPlayers: [
        { avatar: "witch", id: 1, name: "juan" },
        { avatar: "dracula", id: 2, name: "bety" },
      ],
      arrayImages,
      category: "cats",
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("deberia redirigirlo a tema si el usuario no cuenta con array de imagenes", async () => {
    useGame.mockReturnValue({
      playerMove: { avatar: "witch", id: 1, name: "juan" },
      cardsGame: [],
      gameData: [
        { avatar: "witch", id: 1, name: "juan", score: 0 },
        { avatar: "dracula", id: 2, name: "bety", score: 0 },
      ],
      endGame: false,
      score: null,
      initGame: jest.fn(),
      handleCardFlip: jest.fn(),
    });
    useTimer.mockReturnValue({
      timer: 0,
      isActive: false,
      isPaused: false,
      handleStart: jest.fn(),
      handlePause: jest.fn(),
      handleResume: jest.fn(),
      handleReset: jest.fn(),
    });
    const contextValueNoImages = {
      dispatch: jest.fn(),
      state: {
        numberPlayers: 2,
        dataPlayers: [
          { avatar: "witch", id: 1, name: "juan" },
          { avatar: "dracula", id: 2, name: "bety" },
        ],
        arrayImages: [],
        category: "cats",
      },
    };
    mount(
      <GameContext.Provider value={contextValueNoImages}>
        <Router history={historyMock}>
          <Game />
        </Router>
      </GameContext.Provider>
    );
    expect(historyMock.push).toHaveBeenCalledWith("/tema");
  });
  test("Debe de resetarse el state al dar clic en endSesionGame ademas de redirigirte a /", async () => {
    useGame.mockReturnValue({
      playerMove: { avatar: "witch", id: 1, name: "juan" },
      cardsGame: [],
      gameData: [
        { avatar: "witch", id: 1, name: "juan", score: 0 },
        { avatar: "dracula", id: 2, name: "bety", score: 0 },
      ],
      endGame: false,
      score: null,
      initGame: jest.fn(),
      handleCardFlip: jest.fn(),
    });
    useTimer.mockReturnValue({
      timer: 0,
      isActive: false,
      isPaused: false,
      handleStart: jest.fn(),
      handlePause: jest.fn(),
      handleResume: jest.fn(),
      handleReset: jest.fn(),
    });

    const wrapper = mount(
      <GameContext.Provider value={contextValue}>
        <Router history={historyMock}>
          <Game />
        </Router>
      </GameContext.Provider>
    );
    wrapper.find(".btn-icon-2.icon-endGame").simulate("click");

    expect(contextValue.dispatch).toHaveBeenCalledWith({
      type: types.RESET,
      payload: {
        numberPlayers: 0,
        dataPlayers: [],
        arrayImages: [],
        category: null,
      },
    });

    expect(historyMock.push).toHaveBeenCalledWith("/");
  });

  test("Debe de reiniciarte el juego con los valores por defecto", async () => {
    useGame.mockReturnValue({
      playerMove: { avatar: "witch", id: 1, name: "juan" },
      cardsGame: mockGameCards,
      gameData: [
        { avatar: "witch", id: 1, name: "juan", score: 0 },
        { avatar: "dracula", id: 2, name: "bety", score: 0 },
      ],
      endGame: false,
      score: null,
      initGame: jest.fn(),
      handleCardFlip: jest.fn(),
    });
    useTimer.mockReturnValue({
      timer: 0,
      isActive: false,
      isPaused: false,
      handleStart: jest.fn(),
      handlePause: jest.fn(),
      handleResume: jest.fn(),
      handleReset: jest.fn(),
    });

    const wrapper = mount(
      <GameContext.Provider value={contextValue}>
        <Router history={historyMock}>
          <Game />
        </Router>
      </GameContext.Provider>
    );
    wrapper.find(".btn-icon-2.icon-repeat").simulate("click");

    expect(wrapper).toMatchSnapshot();

    expect(wrapper.find(".flipped").length).toBe(0);
    expect(wrapper.find(".disabled").length).toBe(0);
    expect(wrapper.find(".cards-list").exists()).toBe(true);
    expect(wrapper.find(".modal-box").hasClass("active")).toBe(false);
    expect(wrapper.find(".screen").hasClass("shadow")).toBe(false);
    expect(wrapper.find(".options-aftergame").exists()).toBe(false);
  });

  test("Debe de mostrar la informacion de los jugadores", async () => {
    useGame.mockReturnValue({
      playerMove: { avatar: "witch", id: 1, name: "juan" },
      cardsGame: mockGameCards,
      gameData: [
        { avatar: "witch", id: 1, name: "juan", score: 0 },
        { avatar: "dracula", id: 2, name: "bety", score: 0 },
      ],
      endGame: false,
      score: null,
      initGame: jest.fn(),
      handleCardFlip: jest.fn(),
    });
    useTimer.mockReturnValue({
      timer: 0,
      isActive: false,
      isPaused: false,
      handleStart: jest.fn(),
      handlePause: jest.fn(),
      handleResume: jest.fn(),
      handleReset: jest.fn(),
    });

    const wrapper = mount(
      <GameContext.Provider value={contextValue}>
        <Router history={historyMock}>
          <Game />
        </Router>
      </GameContext.Provider>
    );

    expect(wrapper.find(".header-game .header-gamedata-item").length).toBe(2);

    expect(
      wrapper
        .find(".header-game .header-gamedata-item")
        .at(0)
        .find(".header-gamedata-data")
        .text()
        .trim()
    ).toBe("juan 0");
    expect(
      wrapper
        .find(".header-game .header-gamedata-item")
        .at(1)
        .find(".header-gamedata-data")
        .text()
        .trim()
    ).toBe("bety 0");

    expect(wrapper.find(".timer p").text().trim()).toBe("00:00:00");
  });

  test("Debe de mostrar el modal cuando termine el juego, ocultarse las tarjetas, mostrar las opciones repetir o terminar juego", async () => {
    const contextValueEndGame = {
      dispatch: jest.fn(),
      state: {
        numberPlayers: 1,
        dataPlayers: [{ avatar: "witch", id: 1, name: "juan" }],
        arrayImages,
        category: "cats",
      },
    };
    useGame.mockReturnValue({
      playerMove: { avatar: "witch", id: 1, name: "juan" },
      cardsGame: mockGameCards,
      gameData: [{ avatar: "witch", id: 1, name: "juan", score: 10 }],
      endGame: true,
      score: 2332,
      initGame: jest.fn(),
      handleCardFlip: jest.fn(),
    });
    useTimer.mockReturnValue({
      timer: 90,
      isActive: false,
      isPaused: false,
      handleStart: jest.fn(),
      handlePause: jest.fn(),
      handleResume: jest.fn(),
      handleReset: jest.fn(),
    });

    const wrapper = mount(
      <GameContext.Provider value={contextValueEndGame}>
        <Router history={historyMock}>
          <Game />
        </Router>
      </GameContext.Provider>
    );
    expect(wrapper.find(".cards-list").exists()).toBe(false);
    expect(wrapper.find(".modal-box").hasClass("active")).toBe(true);
    expect(wrapper.find(".screen").hasClass("shadow")).toBe(true);
    expect(wrapper.find(".timer p").text().trim()).toBe("00:01:30");
    expect(wrapper.find(".modal-box .score-modal").text().trim()).toBe("2332");
    expect(wrapper.find(".options-aftergame").exists()).toBe(true);
  });
});
