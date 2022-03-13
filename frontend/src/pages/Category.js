import React, { useContext, useState } from "react";
import Loader from "../components/templates/Loader";
import { useFetchCards } from "../hooks/useFetchCards";
import { useForm } from "../hooks/useForm";
import GameContext from "../context/GameContext";
import { types } from "../types/types";
import { useHistory } from "react-router-dom";
import Layout from "../components/layout/Layout";
import CardsPreview from "../components/CardsPreview";
import Error from "../components/templates/Error";
import { NUMBER_CARDS, url } from "../constants/utils";

const initialState = {
  categoryCombo: "",
  categoryCustom: "",
};
const Category = () => {
  const { dispatch } = useContext(GameContext);
  const history = useHistory();
  const [values, handleInputChange] = useForm(initialState);
  const { arrayImages, loading, error, setArrayImages, handlefetchCards } =
    useFetchCards(url, NUMBER_CARDS);

  const { categoryCombo, categoryCustom } = values;

  const [showCards, setShowCards] = useState(false);

  const handleChange = (e) => {
    handleInputChange(e);
    validationCategory(e);
  };
  const validationCategory = ({ target }) => {
    setShowCards(false);
    setArrayImages([]);
    if (
      target.name === "categoryCombo" &&
      target.value &&
      target.value !== "other"
    ) {
      handlefetchCards(target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch({
      type: types.SET_CARDS_GAME,
      payload: {
        category: categoryCombo !== "other" ? categoryCombo : categoryCustom,
        arrayImages,
      },
    });
    history.push("/juego");
  };

  return (
    <Layout>
      <section className="form top-bottom-space">
        <div className="container">
          <section className="section-format col">
            <form>
              <div className="field ">
                <label>Selecciona un tema</label>
                <div className="select-simple">
                  <div className="select-simple__container">
                    <select
                      name="categoryCombo"
                      onChange={(e) => handleChange(e)}
                      value={categoryCombo}
                    >
                      <option value="">Seleccionar</option>
                      <option value="cats">Gatos</option>
                      <option value="dogs">Perros</option>
                      <option value="other">Otro</option>
                    </select>
                  </div>
                </div>
              </div>
              {categoryCombo === "other" && (
                <div className="field input-category-custom">
                  <label>Nombre de tema</label>
                  <div className="input-combo-icon">
                    <input
                      type="text"
                      className="u-full-width"
                      placeholder="Por ejemplo Disney, Skate, New York, Coches, etc"
                      name="categoryCustom"
                      value={categoryCustom}
                      onChange={(e) => handleChange(e)}
                    />
                    <button
                      type="submit"
                      className="btn-icon btn-absolute btn-color-5 icon-search"
                      value="enviar"
                      onClick={(e) => {
                        e.preventDefault();
                        handlefetchCards(categoryCustom);
                      }}
                    ></button>
                  </div>
                </div>
              )}

              {loading && <Loader />}
              {error && <Error msg={error} />}
              {arrayImages.length === NUMBER_CARDS && (
                <>
                  <div className="buttons-row">
                    <button
                      type="submit"
                      className="btn-primary show-cards-btn  btn-size-2 btn-color-2"
                      value="enviar"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowCards(true);
                      }}
                    >
                      Ver las tarjetas
                    </button>

                    <button
                      type="submit"
                      className="btn-primary start-game-btn btn-size-2 btn-color-4"
                      value="enviar"
                      onClick={handleSubmit}
                    >
                      Empezar el juego
                    </button>
                  </div>
                </>
              )}
            </form>
          </section>

          {showCards && (
            <CardsPreview
              setShowCards={setShowCards}
              arrayImages={arrayImages}
            />
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Category;
