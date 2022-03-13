import { renderHook, act } from "@testing-library/react-hooks";
import { useForm } from "../../hooks/useForm";

describe("Pruebas en <Category />", () => {
  const initialState = {
    categoryCombo: "",
    categoryCustom: "",
  };
  test("Debe de mostarrse correctamente el snapshot", () => {
    const { result } = renderHook(() => useForm(initialState));
    const [values, handleInputChange, reset] = result.current;

    expect(values).toEqual(initialState);
    expect(typeof handleInputChange).toEqual("function");
    expect(typeof reset).toEqual("function");
  });

  test("Debe de cambiar el valor del formulario cambiar la categoria", () => {
    const { result } = renderHook(() => useForm(initialState));
    const [, handleInputChange] = result.current;

    const event = {
      target: {
        value: "cats",
        name: "categoryCombo",
      },
    };
    act(() => {
      handleInputChange(event);
    });
    const [values] = result.current;
    expect(values).toEqual({
      ...values,
      categoryCombo: "cats",
    });
  });

  test("Debe de reestablecer el formulario con RESET", () => {
    const { result } = renderHook(() => useForm(initialState));
    const [, handleInputChange, reset] = result.current;

    const event = {
      target: {
        value: "cats",
        name: "categoryCombo",
      },
    };
    act(() => {
      handleInputChange(event);
      reset();
    });
    const [values] = result.current;
    expect(values).toEqual(initialState);
  });
});
