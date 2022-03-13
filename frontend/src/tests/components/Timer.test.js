import { mount } from "enzyme";

import Timer from "../../components/Timer";

describe("Pruebas en <Error />", () => {
  test("Debe de formatear el tiempo (00:00:00) dado una cantidad de segundos (enteros)", () => {
    const wrapper = mount(<Timer timer={890} />);

    expect(wrapper.find("p").text().trim()).toBe("00:14:50");
  });
});
