import React, { useState, useEffect, useContext } from "react";
import Layout from "../components/layout/Layout";
import { avatars, playersButtons } from "../constants/utils";
import GameContext from "../context/GameContext";
import { types } from "../types/types";

const initialState = {
  numberPlayers: 0,
  dataPlayers: [],
};

const Player = () => {
  const { dispatch } = useContext(GameContext);
  const [showButton, setShowButton] = useState(false);
  const [state, setState] = useState(initialState);
  const [playersBtns, setPlayersBtns] = useState(playersButtons);
  const { numberPlayers, dataPlayers } = state;

  const handleNumberPlayers = (e, value) => {
    e.preventDefault();
    const playersArray = [];
    for (let index = 0; index < value; index++) {
      playersArray.push({
        id: index,
        name: "",
        avatar: "",
      });
    }
    setPlayersBtns(
      playersButtons.map((item) =>
        item.number === value ? { ...item, selected: true } : item
      )
    );
    setState({
      numberPlayers: value,
      dataPlayers: playersArray,
    });
  };

  const handleChangePlayer = (id, propertyToChange, value) => {
    const newPlayersArray = dataPlayers.map((item) =>
      item.id === id ? { ...item, [propertyToChange]: value } : item
    );
    setState({
      ...state,
      dataPlayers: newPlayersArray,
    });
  };

  const buttonValidation = () => {
    if (numberPlayers !== 0) {
      for (let index = 0; index < numberPlayers; index++) {
        const validation =
          dataPlayers[index].name !== "" && dataPlayers[index].avatar !== "";

        setShowButton(validation);
        if (!validation) return;
      }
    } else {
      setShowButton(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({
      type: types.LOGIN,
      payload: {
        numberPlayers,
        dataPlayers,
      },
    });
  };
  useEffect(() => {
    buttonValidation();
    // eslint-disable-next-line
  }, [numberPlayers, dataPlayers]);

  return (
    <Layout>
      <section className="form top-bottom-space">
        <div className="container">
          <section className="section-format col">
            <div className="field">
              <label>Elige el número de Jugadores </label>
              <div className="buttons-row">
                {playersBtns.map((item) => (
                  <button
                    key={item.number}
                    name="numberPlayers"
                    onClick={(e) => handleNumberPlayers(e, item.number)}
                    className={`btn-primary   btn-size-2  ${
                      item.selected ? "btn-color-2" : "btn-color-1"
                    } `}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </section>
          {dataPlayers.map((item) => (
            <div className="section-format player-block col" key={item.id}>
              {numberPlayers === 2 && <h3>Jugador {item.id + 1}</h3>}
              <div className="field">
                <label>Nombre</label>
                <input
                  type="text"
                  className="u-full-width"
                  placeholder="Nombre"
                  value={item.name}
                  onChange={(e) =>
                    handleChangePlayer(item.id, "name", e.target.value)
                  }
                />
              </div>

              <div className="field">
                <label>Elige tu avatar</label>
                <div className="avatars-row">
                  {avatars.map((elem) => (
                    <figure
                      key={elem.id}
                      onClick={() =>
                        handleChangePlayer(item.id, "avatar", elem.name)
                      }
                      className={`avatar-box ${
                        item.avatar === elem.name ? "selected" : ""
                      }`}
                    >
                      <img
                        alt="avatar"
                        width="250"
                        height="250"
                        src={elem.url}
                      />
                    </figure>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {showButton && (
            <div className="section-format-actions">
              <button
                type="submit"
                className="btn-primary  btn-size-2 btn-orientation-auto btn-color-4"
                value="enviar"
                onClick={handleSubmit}
              >
                Continuar
              </button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Player;
