import { mount } from "enzyme";
import { Router } from "react-router-dom";
import Layout from "../../../components/layout/Layout";
import GameContext from "../../../context/GameContext";

describe("Pruebas en <Layout />", () => {
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

  test("Debe de mostarrse correctamente el component en el layout", () => {
    const Children = <div className="contenido">Hola soy contenido</div>;
    const wrapper = mount(
      <GameContext.Provider value={contextValue}>
        <Router history={historyMock}>
          <Layout children={Children} />
        </Router>
      </GameContext.Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".contenido").text().trim()).toBe("Hola soy contenido");
  });
});
