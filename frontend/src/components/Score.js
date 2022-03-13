import React, { useEffect, useState } from "react";
import Loader from "./templates/Loader";
import { saveScore } from "../helpers/saveScore";

const Score = ({
  active,
  gameData,
  numberPlayers,
  score,
  loading,
  dataPlayers,
  timer,
  setLoading,
}) => {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setModal(active);

    setLoading(true);
    saveScore(numberPlayers, active, score, dataPlayers, timer);
    setLoading(false);
    // eslint-disable-next-line
  }, [active]);

  return (
    <>
      <div className={`modal-box medium-size ${modal ? "active" : ""}`}>
        <div className="head-modal">
          <h2>Score final</h2>
        </div>
        <div className="modal-box-inner">
          <div className="header-gamedata center-jus">
            {gameData.map((item) => (
              <div key={item.id} className="header-gamedata-item">
                <div className="header-gamedata-avatar">
                  <img
                    alt="avatar"
                    src={require(`../assets/images/avatar/${item.avatar}.png`)}
                  />
                </div>
                <div className="header-gamedata-data">
                  <span> {item.name}</span> <br />
                  <strong className="score-modal ">
                    {" "}
                    {numberPlayers === 2 ? item.score : score}
                  </strong>
                </div>
              </div>
            ))}
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className="btns-block4">
              <button
                type="button"
                className="btn-primary btn-color-1 btn-size-2 btn-orientation-auto "
                onClick={() => setModal(false)}
              >
                Cerrar
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={`screen ${modal ? "shadow" : ""} `}></div>
    </>
  );
};

export default Score;
