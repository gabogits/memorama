import "@testing-library/react";
import { players } from "../../constants/mocks";
import { GameReducer } from "../../context/GameReducer";
import { types } from "../../types/types";

describe("Pruebas con la funcion calculateScore", () => {
  const state = {
    numberPlayers: 0,
    dataPlayers: [],
    arrayImages: [],
    category: null,
  };
  test("deberia regresar este state al inicio de la aplicacion", () => {
    const reducer = GameReducer(state, {});

    expect(reducer).toEqual(state);
  });
  test("deberia regresar eun numero de jugadores y un arreglo con los jugadores", () => {
    const action = {
      type: types.LOGIN,
      payload: players,
    };
    const reducer = GameReducer(state, action);
    expect(reducer).toEqual({
      numberPlayers: 2,
      dataPlayers: [
        { avatar: "witch", id: 1, name: "juan" },
        { avatar: "dracula", id: 2, name: "bety" },
      ],
      arrayImages: [],
      category: null,
    });
  });

  test("deberia regresar el mismo state si l accion no se encuentra dentro del reducer", () => {
    const state = {
      numberPlayers: 2,
      dataPlayers: players.dataPlayers,
      arrayImages: [
        { image: "http://", name: "gato" },
        { image: "http://", name: "gato2" },
      ],
      category: "gatos",
    };

    const action = {
      type: types.LOQUESEA,
      payload: {
        property: "lo que sea",
      },
    };
    const reducer = GameReducer(state, action);
    expect(reducer).toEqual(state);
  });
});
