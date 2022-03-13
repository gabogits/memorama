import { mount } from "enzyme";
import { Router } from "react-router-dom";
import GameContext from "../../context/GameContext";
import Category from "../../pages/Category";
import { useFetchCards } from "../../hooks/useFetchCards";
import { arrayImages } from "../../constants/mocks";
import { types } from "../../types/types";

jest.mock("../../hooks/useFetchCards");

describe("Pruebas en <Category />", () => {
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

  test("Debe de mostarrse correctamente el snapshot", () => {
    useFetchCards.mockReturnValue({
      arrayImages: [],
      loading: false,
      error: "",
      setArrayImages: jest.fn(),
      handlefetchCards: jest.fn(),
    });

    const wrapper = mount(
      <GameContext.Provider value={contextValue}>
        <Router history={historyMock}>
          <Category />
        </Router>
      </GameContext.Provider>
    );
    expect(wrapper.find("CardsPreview").exists()).toBe(false);
    expect(wrapper.find("Loader").exists()).toBe(false);
    expect(wrapper.find("Error").exists()).toBe(false);
    expect(wrapper.find(".input-category-custom").exists()).toBe(false);

    expect(wrapper.find(".show-cards-btn").exists()).toBe(false);
    expect(wrapper.find(".start-game-btn").exists()).toBe(false);
    expect(wrapper.find("CardsPreview").exists()).toBe(false);
    expect(wrapper).toMatchSnapshot();
  });
  test("No Debe de mostarrse el input categoryCustom cuando elijas cats o dogs, debe de mostrarse el loader y los botones mostrar tarjetas y empezar juego no deben aparecer aùn", () => {
    useFetchCards.mockReturnValue({
      arrayImages: [],
      loading: true,
      error: "",
      setArrayImages: jest.fn(),
      handlefetchCards: jest.fn(),
    });

    const wrapper = mount(
      <GameContext.Provider value={contextValue}>
        <Router history={historyMock}>
          <Category />
        </Router>
      </GameContext.Provider>
    );
    const e = { target: { value: "cats", name: "categoryCombo" } };
    wrapper.find("select").simulate("change", e);
    expect(wrapper.find(".input-category-custom").exists()).toBe(false);
    expect(wrapper.find("Loader").exists()).toBe(true);
    expect(wrapper.find(".show-cards-btn").exists()).toBe(false);
    expect(wrapper.find(".start-game-btn").exists()).toBe(false);
  });

  test("Debe de mostrar los botones para ver tarjetas y empezar el juego, se oculta el loader", () => {
    useFetchCards.mockReturnValue({
      arrayImages,
      loading: false,
      error: "",
      setArrayImages: jest.fn(),
      handlefetchCards: jest.fn(),
    });

    const wrapper = mount(
      <GameContext.Provider value={contextValue}>
        <Router history={historyMock}>
          <Category />
        </Router>
      </GameContext.Provider>
    );
    const e = { target: { value: "cats", name: "categoryCombo" } };
    wrapper.find("select").simulate("change", e);
    expect(wrapper.find("Loader").exists()).toBe(false);
    expect(wrapper.find(".show-cards-btn").exists()).toBe(true);
    expect(wrapper.find(".start-game-btn").exists()).toBe(true);
    expect(wrapper.find("CardsPreview").exists()).toBe(false);
  });
  test("Debe de mostrar las tarjetas al darle click al boton Ver las tarjetas", () => {
    useFetchCards.mockReturnValue({
      arrayImages,
      loading: false,
      error: "",
      setArrayImages: jest.fn(),
      handlefetchCards: jest.fn(),
    });

    const wrapper = mount(
      <GameContext.Provider value={contextValue}>
        <Router history={historyMock}>
          <Category />
        </Router>
      </GameContext.Provider>
    );
    wrapper.find(".show-cards-btn").simulate("click");
    expect(wrapper.find("CardsPreview").exists()).toBe(true);
    expect(wrapper.find("Card").length).toBe(10);
  });

  test("Debe de empezar el juego con categoria predefinida", () => {
    useFetchCards.mockReturnValue({
      arrayImages,
      loading: false,
      error: "",
      setArrayImages: jest.fn(),
      handlefetchCards: jest.fn(),
    });

    const contextNewValue = {
      type: types.SET_CARDS_GAME,
      payload: {
        category: "cats",
        arrayImages,
      },
    };

    const wrapper = mount(
      <GameContext.Provider value={contextValue}>
        <Router history={historyMock}>
          <Category />
        </Router>
      </GameContext.Provider>
    );
    const e = { target: { value: "cats", name: "categoryCombo" } };
    wrapper.find("select").simulate("change", e);

    wrapper.find(".start-game-btn").simulate("click");
    expect(contextValue.dispatch).toHaveBeenCalledTimes(1);
    expect(contextValue.dispatch).toHaveBeenCalledWith(contextNewValue);
    expect(historyMock.push).toHaveBeenCalledWith("/juego");
  });

  test("Debe de mostarrse el input categoryCustom cuando elijas other", () => {
    useFetchCards.mockReturnValue({
      arrayImages: [],
      loading: true,
      error: "",
      setArrayImages: jest.fn(),
      handlefetchCards: jest.fn(),
    });

    const wrapper = mount(
      <GameContext.Provider value={contextValue}>
        <Router history={historyMock}>
          <Category />
        </Router>
      </GameContext.Provider>
    );
    const e = { target: { value: "other", name: "categoryCombo" } };

    wrapper.find("select").simulate("change", e);
    const d = { target: { value: "Harry potter", name: "categoryCustom" } };
    wrapper.find(".input-category-custom input").simulate("change", d);
    expect(wrapper.find(".input-category-custom").exists()).toBe(true);
    expect(wrapper.find("Loader").exists()).toBe(true);
  });

  test("Debe de mostarrse el error", () => {
    useFetchCards.mockReturnValue({
      arrayImages: [],
      loading: false,
      error: "No se encontraton resultados, intenta con otro tema",
      setArrayImages: jest.fn(),
      handlefetchCards: jest.fn(),
    });

    const wrapper = mount(
      <GameContext.Provider value={contextValue}>
        <Router history={historyMock}>
          <Category />
        </Router>
      </GameContext.Provider>
    );
    const e = { target: { value: "other", name: "categoryCombo" } };

    wrapper.find("select").simulate("change", e);
    const d = { target: { value: "Harryss", name: "categoryCustom" } };
    wrapper.find(".input-category-custom input").simulate("change", d);
    expect(wrapper.find(".input-category-custom").exists()).toBe(true);
    expect(wrapper.find("Loader").exists()).toBe(false);
    expect(wrapper.find("Error").exists()).toBe(true);
    expect(wrapper.find(".alert").text().trim()).toBe(
      "No se encontraton resultados, intenta con otro tema"
    );
  });

  test("Empezar juego con categoria customizada", () => {
    useFetchCards.mockReturnValue({
      arrayImages,
      loading: false,
      error: "",
      setArrayImages: jest.fn(),
      handlefetchCards: jest.fn(),
    });

    const contextNewValue = {
      type: types.SET_CARDS_GAME,
      payload: {
        category: "Harry potter",
        arrayImages,
      },
    };

    const wrapper = mount(
      <GameContext.Provider value={contextValue}>
        <Router history={historyMock}>
          <Category />
        </Router>
      </GameContext.Provider>
    );
    const e = { target: { value: "other", name: "categoryCombo" } };

    wrapper.find("select").simulate("change", e);
    const d = { target: { value: "Harry potter", name: "categoryCustom" } };
    wrapper.find(".input-category-custom input").simulate("change", d);
    wrapper.find(".start-game-btn").simulate("click");
    expect(contextValue.dispatch).toHaveBeenCalledTimes(1);
    expect(contextValue.dispatch).toHaveBeenCalledWith(contextNewValue);
    expect(historyMock.push).toHaveBeenCalledWith("/juego");
  });
});
