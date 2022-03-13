import { renderHook, act } from "@testing-library/react-hooks";

import useTimer from "../../hooks/useTimer";

describe("Pruebas en hook useTimer ", () => {
  test("Debe de mostar los valores iniciales", () => {
    const { result } = renderHook(() => useTimer(0));

    const {
      timer,
      isActive,
      isPaused,
      handleStart,
      handlePause,
      handleResume,
      handleReset,
    } = result.current;

    expect(timer).toEqual(0);
    expect(isActive).toBe(false);
    expect(isPaused).toBe(false);
    expect(typeof handleStart).toEqual("function");
    expect(typeof handlePause).toEqual("function");
    expect(typeof handleResume).toEqual("function");
    expect(typeof handleReset).toEqual("function");
  });
  test("Aumentar un segundo", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useTimer(0));

    act(() => {
      result.current.handleStart();
    });

    await waitForNextUpdate({ timeout: 1000 });
    expect(result.current.timer).toEqual(1);
    expect(result.current.isActive).toBe(true);
    expect(result.current.isPaused).toBe(true);
  });

  test("pausar a los 2 segundos", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useTimer(0));

    act(() => {
      result.current.handleStart();
    });

    await waitForNextUpdate({ timeout: 1000 }); // or some timeout high enough that an update should have happened by then
    await waitForNextUpdate({ timeout: 1000 });
    act(() => {
      result.current.handlePause();
    });

    expect(result.current.timer).toEqual(2);
    expect(result.current.isPaused).toBe(false);
  });

  test("debe continuar con el conteo despues de darle handlePause", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useTimer(0));

    act(() => {
      result.current.handleStart();
    });

    await waitForNextUpdate({ timeout: 1000 }); // or some timeout high enough that an update should have happened by then
    await waitForNextUpdate({ timeout: 1000 });
    act(() => {
      result.current.handlePause();
    });

    expect(result.current.timer).toEqual(2);
    expect(result.current.isPaused).toBe(false);
    act(() => {
      result.current.handleResume();
    });
    await waitForNextUpdate({ timeout: 1000 });

    expect(result.current.timer).toEqual(3);
    expect(result.current.isPaused).toBe(true);
  });

  test("debe de limpiar los valores con handleReset", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useTimer(0));

    act(() => {
      result.current.handleStart();
    });

    await waitForNextUpdate({ timeout: 1000 }); // or some timeout high enough that an update should have happened by then
    await waitForNextUpdate({ timeout: 1000 });
    act(() => {
      result.current.handleReset();
    });

    expect(result.current.timer).toEqual(0);
    expect(result.current.isActive).toBe(false);
    expect(result.current.isPaused).toBe(false);
  });
});
