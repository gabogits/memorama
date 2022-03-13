import "@testing-library/react";
import { calculateScore } from "../../helpers/calculateScore";

describe("Pruebas con la funcion calculateScore", () => {
  test("deberia regresar el puntaje total basandose en un numero de segundos, un score maximo y un maximo de tiempo", () => {
    const MAX_SCORE = 10000;
    const MAX_TIME_GAME = 300;
    const seconds = 225;

    const score = calculateScore(MAX_TIME_GAME, seconds, MAX_SCORE);

    expect(score).toEqual(2500);
  });

  test("deberia regresar 0 si valor del tiempo no es un numero", () => {
    const MAX_SCORE = 10000;
    const MAX_TIME_GAME = 300;
    const seconds = "esewr";

    const score = calculateScore(MAX_TIME_GAME, seconds, MAX_SCORE);

    expect(score).toEqual(0);
  });

  test("deberia regresar 0 si valor del tiempo máximo no es un numero", () => {
    const MAX_SCORE = 10000;
    const MAX_TIME_GAME = "dffd";
    const seconds = 225;

    const score = calculateScore(MAX_TIME_GAME, seconds, MAX_SCORE);

    expect(score).toEqual(0);
  });
  test("deberia regresar 0 si valor del score no es un numero", () => {
    const MAX_SCORE = 10000;
    const MAX_TIME_GAME = "dffd";
    const seconds = 225;

    const score = calculateScore(MAX_TIME_GAME, seconds, MAX_SCORE);

    expect(score).toEqual(0);
  });
  test("deberia regresar 0 si valor del tiempo es mayor al máximo permitido", () => {
    const MAX_SCORE = 10000;
    const MAX_TIME_GAME = 300;
    const seconds = 325;

    const score = calculateScore(MAX_TIME_GAME, seconds, MAX_SCORE);

    expect(score).toEqual(0);
  });
});
