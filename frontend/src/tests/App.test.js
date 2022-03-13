import { mount } from "enzyme";
import App from "../App";

describe("Pruebas en <App />", () => {
  Storage.prototype.setItem = jest.fn();
  Storage.prototype.getItem = jest.fn();
  test("Debe de mostar la routa / al inicio de la aplicacion", () => {
    const wrapper = mount(<App />);
    expect(wrapper).toMatchSnapshot();
    expect(localStorage.setItem).toHaveBeenCalledWith("dataPlayers", "[]");

    expect(wrapper.find("label").text().trim()).toBe(
      "Elige el número de Jugadores"
    );
  });
});
