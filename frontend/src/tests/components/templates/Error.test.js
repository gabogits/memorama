import { mount } from "enzyme";
import Error from "../../../components/templates/Error";

describe("Pruebas en <Error />", () => {
  test("Debe de mostarrse correctamente el mensaje de error", () => {
    const wrapper = mount(<Error msg={"campos sin llenar"} />);

    expect(wrapper.find(".alert").text().trim()).toBe("campos sin llenar");
  });
});
