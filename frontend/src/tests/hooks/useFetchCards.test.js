import { renderHook, act } from "@testing-library/react-hooks";
import { useFetchCards } from "../../hooks/useFetchCards";
import { NUMBER_CARDS, url } from "../../constants/utils";

describe("Pruebas en useFetchCards", () => {
  test("Debe de mostarrse correctamente el snapshot", () => {
    const { result } = renderHook(() => useFetchCards(url, NUMBER_CARDS));

    const { arrayImages, loading, error, setArrayImages, handlefetchCards } =
      result.current;

    expect(arrayImages).toEqual([]);
    expect(loading).toBe(false);
    expect(error).toBe("");
    expect(typeof setArrayImages).toEqual("function");
    expect(typeof handlefetchCards).toEqual("function");
  });

  test("Debe de hacer fetch a las imagenes e incluirlas en array si obtiene la solicitud 10 resultados", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchCards(url, NUMBER_CARDS)
    );
    expect(result.current.arrayImages).toEqual([]);
    act(() => {
      result.current.handlefetchCards("cats");
    });
    expect(result.current.loading).toBe(true);

    await waitForNextUpdate({ timeout: 5000 });

    expect(result.current.arrayImages.length).toEqual(10);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("");
  });

  test("Debe de hmostar el error cuando no se encontraton resultados,o son menores al minimo", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchCards(url, NUMBER_CARDS)
    );
    expect(result.current.arrayImages).toEqual([]);
    act(() => {
      result.current.handlefetchCards("alicia");
    });
    expect(result.current.loading).toBe(true);

    await waitForNextUpdate({ timeout: 5000 });

    expect(result.current.arrayImages.length).toEqual(0);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(
      "No se encontraton resultados, intenta con otro tema"
    );
  });

  test("Provocar error", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchCards("https://reqres.in/apid/users?page=2", NUMBER_CARDS)
    );
    expect(result.current.arrayImages).toEqual([]);
    act(() => {
      result.current.handlefetchCards("cats");
    });
    expect(result.current.loading).toBe(true);

    await waitForNextUpdate({ timeout: 5000 });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("Ocurrio un error");
  });
});
