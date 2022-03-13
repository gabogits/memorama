import "@testing-library/react";
import { catchError } from "../../helpers/catchError";

describe("Pruebas con la funcion calculateScore", () => {
  test("regresar el msg de error si viene de un objeto con esta estructura error.response.data.msg", () => {
    const error = {
      response: {
        data: {
          msg: "error.response.data.msg",
        },
      },
    };
    const errorMsg = catchError(error);

    expect(errorMsg).toEqual("error.response.data.msg");
  });
  test("regresar el msg de error si viene de un objeto con esta estructura error.response.data.error.msg", () => {
    const error = {
      response: {
        data: {
          error: {
            msg: "error.response.data.error.msg",
          },
        },
      },
    };
    const errorMsg = catchError(error);

    expect(errorMsg).toEqual("error.response.data.error.msg");
  });
  test("si no existe una propiedad response por lo que error esta en la propiedad msg", () => {
    const error = {
      msg: "error.msg",
    };
    const errorMsg = catchError(error);

    expect(errorMsg).toEqual("error.msg");
  });

  test("regresar undefined si el error no es un objeto o tiene una escrutura diferente a las antes mencionadas", () => {
    const error = "undefined";

    const errorMsg = catchError(error);

    expect(errorMsg).toEqual(undefined);
  });
});
