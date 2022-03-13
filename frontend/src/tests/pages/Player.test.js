import React from "react";
import { mount } from "enzyme";
import { Router } from "react-router-dom";
import GameContext from "../../context/GameContext";
import Player from "../../pages/Player";
import "@testing-library/jest-dom";
import { types } from "../../types/types";

describe("Pruebas en <Player />", () => {
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
      numberPlayers: 0,
      dataPlayers: [],
      arrayImages: [],
      category: null,
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });
  const wrapper = mount(
    <GameContext.Provider value={contextValue}>
      <Router history={historyMock}>
        <Player />
      </Router>
    </GameContext.Provider>
  );
  test("Debe de mostarrse un formulario de jugador cuando selecciones un jugador", async () => {
    expect(
      wrapper.find(".buttons-row button").at(0).hasClass("btn-color-1")
    ).toBe(true);
    wrapper.find(".buttons-row button").at(0).simulate("click");
    expect(
      wrapper.find(".buttons-row button").at(0).hasClass("btn-color-2")
    ).toBe(true);
    expect(wrapper.find(".player-block").length).toBe(1);
    expect(wrapper.find(".section-format-actions").exists()).toBe(false);
  });

  test("Debe de habilitarse el boton continuar cuando llenas el formulario del jugador", async () => {
    wrapper.find(".buttons-row button").at(0).simulate("click");

    wrapper.find("input").simulate("change", { target: { value: "juan" } });
    expect(wrapper.find(".avatars-row figure").at(2).hasClass("selected")).toBe(
      false
    );
    wrapper.find(".avatars-row figure").at(2).simulate("click");
    expect(wrapper.find(".avatars-row figure").at(2).hasClass("selected")).toBe(
      true
    );

    expect(wrapper.find(".section-format-actions").exists()).toBe(true);
  });

  test("Deberia ejecutar dispatch al dar click en el boton continuar", async () => {
    const contextNewValue = {
      type: types.LOGIN,
      payload: {
        numberPlayers: 1,
        dataPlayers: [{ avatar: "frankenstein", id: 0, name: "juan" }],
      },
    };

    wrapper.find(".buttons-row button").at(0).simulate("click");

    wrapper.find("input").simulate("change", { target: { value: "juan" } });
    wrapper.find(".avatars-row figure").at(2).simulate("click");
    wrapper.find(".section-format-actions button").simulate("click");
    expect(contextValue.dispatch).toHaveBeenCalledTimes(1);
    expect(contextValue.dispatch).toHaveBeenCalledWith(contextNewValue);
  });

  test("Debe de mostarrse dos bloques de formulario de jugador cuando selecciones dos jugadores", async () => {
    wrapper.find(".buttons-row button").at(1).simulate("click");

    expect(wrapper.find(".player-block").length).toBe(2);
    expect(wrapper.find(".player-block h3").at(0).text().trim()).toBe(
      "Jugador 1"
    );
    expect(wrapper.find(".player-block h3").at(1).text().trim()).toBe(
      "Jugador 2"
    );
  });
});
