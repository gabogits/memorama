import "@testing-library/react";

import { getScores } from "../../helpers/getScores";
import mockAxios from "axios";

describe("Pruebas con la funcion getScore", () => {
  test("debe traer la data del mock", async () => {
    const response = {
      data: {
        __v: 0,
        _id: "62155e654c848f0029dd6273",
        avatar: "dracula",
        created: "2022-02-22T22:06:27.341Z",
        name: "Yuki",
        score: 8266,
        time: "00:00:54",
      },
    };

    mockAxios.get.mockImplementationOnce(() => Promise.resolve(response));
    const result = await getScores();

    expect(result).toEqual(response.data);
    expect(mockAxios.get).toHaveBeenCalledWith("/ranking");
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
    // mockAxios.get.mockRejectedValueOnce(new Error(message));
    mockAxios.get.mockRejectedValueOnce(error);

    const result = await getScores();
    //expect(result).toEqual(undefined);
    expect(result).toEqual("No se obtuvo respuesta");

    expect(mockAxios.get).toHaveBeenCalledWith("/ranking");
  });
});
