import "@testing-library/react";
import formatTime from "../../helpers/formatTimer";

describe("Pruebas con la funcion calculateScore", () => {
  test("tomando un numero de segundos  deberia regresar un formato de tiempo expresado en HH:MM:SS", () => {
    const seconds = 2890;
    const time = formatTime(seconds);

    expect(time).toEqual("00:48:10");
  });

  test("deberia regresar 00:00:00 si el valor de segundos no es un numero", () => {
    const seconds = "ewwee";
    const time = formatTime(seconds);

    expect(time).toEqual("00:00:00");
  });
});
