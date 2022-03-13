import { mount } from "enzyme";
import { MemoryRouter } from "react-router";
import { PrivateRoute } from "../../routers/PrivateRoute";

describe("Pruebas en <PrivateRoute />", () => {
  const props = {
    location: {
      pathname: "tema",
    },
  };
  test("Debe de mostarrse el componente si  tiene datos de jugadores", () => {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          dataPlayers={2}
          component={() => <div>Pagina tema</div>}
          {...props}
        ></PrivateRoute>
      </MemoryRouter>
    );

    expect(wrapper.find("div").exists()).toBe(true);
  });

  test("No debe de mostarrse el componente si  tiene datos de jugadores", () => {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          dataPlayers={0}
          component={() => <div>Pagina tema</div>}
          {...props}
        ></PrivateRoute>
      </MemoryRouter>
    );

    expect(wrapper.find("div").exists()).toBe(false);
  });
});
