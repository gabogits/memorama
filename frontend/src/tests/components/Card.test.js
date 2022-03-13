import { mount, shallow } from "enzyme";

import Card from "../../components/Card";

describe("Pruebas en <Error />", () => {
  const handleFlipCard = jest.fn();

  test("Debe de mostarse correctamente la tarjeta de reverso", () => {
    const item = {
      nanoId: 9090,
      parid: 9090,
      url: "https://urlimage.com",
      flipped: false,
      active: true,
    };
    const wrapper = shallow(
      <Card item={item} handleFlipCard={handleFlipCard} active={item.active} />
    );
    expect(wrapper.find(".flip-card").hasClass("flipped")).toBe(false);
    expect(wrapper.find(".flip-card").hasClass("disabled")).toBe(false);
    expect(wrapper.find("img").prop("src")).toBe("idontknow.jpg");
  });

  test("Debe de mostarse correctamente la tarjeta cuando esta de frente", () => {
    const item = {
      nanoId: 9090,
      parid: 9090,
      url: "https://urlimage.com",
      flipped: true,
      active: true,
    };
    const wrapper = shallow(
      <Card
        item={item}
        handleFlipCard={handleFlipCard}
        flipped={item.flipped}
        active={item.active}
      />
    );
    expect(wrapper.find(".flip-card").hasClass("flipped")).toBe(true);
    expect(wrapper.find(".flip-card").hasClass("disabled")).toBe(false);
    expect(wrapper.find("img").prop("src")).toBe(item.url);
  });
  test("Debe de mostarse correctamente la tarjeta cuando desactivada", () => {
    const item = {
      nanoId: 9090,
      parid: 9090,
      url: "https://urlimage.com",
      flipped: true,
      active: false,
    };
    const wrapper = shallow(
      <Card
        item={item}
        handleFlipCard={handleFlipCard}
        flipped={item.flipped}
        active={item.active}
      />
    );
    expect(wrapper.find(".flip-card").hasClass("flipped")).toBe(true);
    expect(wrapper.find(".flip-card").hasClass("disabled")).toBe(true);
    expect(wrapper.find("img").prop("src")).toBe(item.url);
  });

  test("Debe de llamar la funcion handleFlipCard con los parametros correctos", () => {
    const item = {
      nanoId: 9090,
      parid: 9090,
      url: "https://urlimage.com",
      flipped: true,
      active: true,
    };
    const wrapper = shallow(
      <Card
        item={item}
        handleFlipCard={handleFlipCard}
        flipped={item.flipped}
        active={item.active}
      />
    );
    wrapper.find(".flip-card").prop("onClick", {})();

    expect(handleFlipCard).toHaveBeenCalledWith(
      item.nanoId,
      item.parid,
      item.active
    );
  });
});
