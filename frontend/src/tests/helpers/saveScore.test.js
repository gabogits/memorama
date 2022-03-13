import "@testing-library/react";
import { saveScore } from "../../helpers/saveScore";
import mockAxios from "axios";

describe("Pruebas con la funcion saveScore", () => {
  test("debe traer la data del mock", async () => {
    const data = {
      numberPlayers: 1,
      endGame: true,
      score: 1900,
      dataPlayers: [{ avatar: "witch", id: 1, name: "juan" }],
      timer: 180,
    };
    const values = {
      name: data.dataPlayers[0].name,
      score: data.score,
      time: "00:03:00",
      avatar: data.dataPlayers[0].avatar,
    };
    const response = "Success";
    mockAxios.post.mockImplementationOnce(() => Promise.resolve(response));
    await saveScore(
      data.numberPlayers,
      data.endGame,
      data.score,
      data.dataPlayers,
      data.timer
    );

    // expect(result).toEqual(response.data);
    expect(mockAxios.post).toHaveBeenCalledWith("/ranking", values);
  });
  test("no debe ejecutarse si endgame es false", async () => {
    const data = {
      numberPlayers: 1,
      endGame: false,
      score: 1900,
      dataPlayers: [{ avatar: "witch", id: 1, name: "juan" }],
      timer: 180,
    };

    await saveScore(
      data.numberPlayers,
      data.endGame,
      data.score,
      data.dataPlayers,
      data.timer
    );

    // expect(result).toEqual(response.data);
    expect(mockAxios.post).not.toHaveBeenCalled();
  });
  test("no debe ejecutarse si hay dos jugadores", async () => {
    const data = {
      numberPlayers: 2,
      endGame: true,
      score: 1900,
      dataPlayers: [
        { avatar: "witch", id: 1, name: "juan" },
        { avatar: "dracula", id: 2, name: "bety" },
      ],
      timer: 180,
    };

    await saveScore(
      data.numberPlayers,
      data.endGame,
      data.score,
      data.dataPlayers,
      data.timer
    );

    // expect(result).toEqual(response.data);
    expect(mockAxios.post).not.toHaveBeenCalled();
  });
  test("deberia returnar el error", async () => {
    const error = {
      response: {
        data: {
          error: {
            msg: "No se obtuvo respuesta",
          },
        },
      },
    };

    mockAxios.get.mockRejectedValueOnce(error);
    const result = await saveScore();
    expect(result).toEqual(undefined);
  });
});
