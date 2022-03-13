import React from "react";
import { mount } from "enzyme";
import { Router } from "react-router-dom";
import GameContext from "../../context/GameContext";
import { act } from "@testing-library/react";
import { getScores } from "../../helpers/getScores";
import Ranking from "../../pages/Ranking";
jest.mock("../../helpers/getScores");

describe("Pruebas en <Ranking />", () => {
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
  const waitForComponentToPaint = async (wrapper) => {
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve));
      wrapper.update();
    });
  };
  beforeEach(() => {
    getScores.mockClear();
  });
  test("Debe de pintarse el listado del ranking", async () => {
    getScores.mockReturnValue([
      { _id: 1, avatar: "witch", name: "juan", time: "00:01:20", score: 1000 },
      { _id: 2, avatar: "dracula", name: "beto", time: "00:02:20", score: 800 },
    ]);
    const wrapper = mount(
      <GameContext.Provider value={contextValue}>
        <Router history={historyMock}>
          <Ranking />
        </Router>
      </GameContext.Provider>
    );
    expect(wrapper.find(".ranking-container").exists()).toBe(false);
    expect(wrapper.find("Loader").exists()).toBe(true);
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find("Loader").exists()).toBe(false);
    expect(wrapper.find(".ranking-container").exists()).toBe(true);

    expect(
      wrapper.find(".list-item").at(0).find(".text-block h4").text().trim()
    ).toBe("juan");
    expect(
      wrapper.find(".list-item").at(0).find(".right-content h3").text().trim()
    ).toBe("1000");

    expect(
      wrapper.find(".list-item").at(1).find(".text-block h4").text().trim()
    ).toBe("beto");
    expect(
      wrapper.find(".list-item").at(1).find(".right-content h3").text().trim()
    ).toBe("800");
    expect(wrapper).toMatchSnapshot();
  });
});
