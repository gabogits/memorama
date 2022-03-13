import { mount } from "enzyme";
import Score from "../../components/Score";
import { saveScore } from "../../helpers/saveScore";
jest.mock("../../helpers/saveScore");

describe("Pruebas en <Score />", () => {
  const setLoading = jest.fn();
  const gameData = [
    { avatar: "witch", id: 1, name: "juan", score: 7 },
    { avatar: "dracula", id: 2, name: "bety", score: 3 },
  ];

  const dataPlayers = [
    { avatar: "witch", id: 1, name: "juan" },
    { avatar: "dracula", id: 2, name: "bety" },
  ];
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("Debe de mostarrse correctamente el mensaje de error", () => {
    const wrapper = mount(
      <Score
        active={false}
        gameData={gameData}
        numberPlayers={2}
        score={0}
        loading={false}
        dataPlayers={dataPlayers}
        timer={900}
        setLoading={setLoading}
      />
    );
    expect(saveScore).toHaveBeenCalledTimes(1);

    expect(wrapper.find(".modal-box").hasClass("active")).toBe(false);
    expect(wrapper.find(".screen").hasClass("shadow")).toBe(false);
  });

  test("Debe de mostrar el score de cada jugador y el loader cuando intente guardar la partida", () => {
    const wrapper = mount(
      <Score
        active={true}
        gameData={gameData}
        numberPlayers={2}
        score={0}
        saveScore={saveScore}
        loading={true}
        dataPlayers={dataPlayers}
        timer={900}
        setLoading={setLoading}
      />
    );
    expect(saveScore).toHaveBeenCalledTimes(1);
    expect(saveScore).toHaveBeenCalledWith(
      2,
      true,
      0,
      [
        { avatar: "witch", id: 1, name: "juan" },
        { avatar: "dracula", id: 2, name: "bety" },
      ],
      900
    );

    expect(wrapper.find(".modal-box").hasClass("active")).toBe(true);
    expect(wrapper.find(".screen").hasClass("shadow")).toBe(true);

    expect(
      wrapper.find(".header-gamedata-item").at(0).find("img").prop("src")
    ).toBe("witch.png");

    expect(
      wrapper.find(".header-gamedata-item").at(0).find("strong").text().trim()
    ).toBe("7");

    expect(wrapper.find("Loader").exists()).toBe(true);
  });
});
