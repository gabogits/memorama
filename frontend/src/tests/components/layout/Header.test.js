import { mount } from "enzyme";
import { Router } from "react-router-dom";
import Header from "../../../components/layout/Header";
import GameContext from "../../../context/GameContext";
import { types } from "../../../types/types";

describe("Pruebas en <Header />", () => {
  let historyMock = {
    push: jest.fn(),
    replace: jest.fn(),
    location: jest.fn(),
    listen: jest.fn(),
    createHref: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Debe  de mostarse solo dos enlaces inicio y ranking, sin tener sesion", () => {
    const contextValue = {
      dispatch: jest.fn(),
      state: {
        numberPlayers: 0,
        dataPlayers: [],
        arrayImages: [],
        category: null,
      },
    };
    const wrapper = mount(
      <GameContext.Provider value={contextValue}>
        <Router history={historyMock}>
          <Header />
        </Router>
      </GameContext.Provider>
    );

    expect(wrapper.find(".nav-list ul li").length).toBe(2);
    expect(wrapper.find(".nav-list ul li").at(0).text().trim()).toBe("Inicio");
    expect(wrapper.find(".nav-list ul li").at(1).text().trim()).toBe("Ranking");
  });

  test("Debe  de mostarse solo cuatro enlaces inicio, Tema, Juego y Ranking, al tener sesion", () => {
    const contextValue = {
      dispatch: jest.fn(),
      state: {
        numberPlayers: 2,
        dataPlayers: [
          { avatar: "witch", id: 1, name: "juan" },
          { avatar: "dracula", id: 2, name: "bety" },
        ],
        arrayImages: [],
        category: null,
      },
    };
    const wrapper = mount(
      <GameContext.Provider value={contextValue}>
        <Router history={historyMock}>
          <Header />
        </Router>
      </GameContext.Provider>
    );

    expect(wrapper.find(".nav-list ul li").length).toBe(4);
    expect(wrapper.find(".nav-list ul li").at(0).text().trim()).toBe("Inicio");
    expect(wrapper.find(".nav-list ul li").at(1).text().trim()).toBe("Tema");
    expect(wrapper.find(".nav-list ul li").at(2).text().trim()).toBe("Juego");
    expect(wrapper.find(".nav-list ul li").at(3).text().trim()).toBe("Ranking");
  });

  test("Debe  de llamar reset con y rerigir a /", () => {
    const contextValue = {
      dispatch: jest.fn(),
      state: {
        numberPlayers: 2,
        dataPlayers: [
          { avatar: "witch", id: 1, name: "juan" },
          { avatar: "dracula", id: 2, name: "bety" },
        ],
        arrayImages: [],
        category: null,
      },
    };
    historyMock.location.pathname = "holi";
    const wrapper = mount(
      <GameContext.Provider value={contextValue}>
        <Router history={historyMock}>
          <Header />
        </Router>
      </GameContext.Provider>
    );

    const e = {
      preventDefault: () => {},
    };
    wrapper.find("button").prop("onClick", {})(e);

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
});
