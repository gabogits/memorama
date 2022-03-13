import React from "react";
import Card from "./Card";

const CardsPreview = ({ arrayImages, setShowCards }) => {
  return (
    <>
      <div className={`modal-box large-size active`}>
        <div className="head-modal">
          <h2>Tarjetas del juego</h2>
        </div>
        <div className="modal-box-inner">
          <div className="cards-list">
            {arrayImages.map((item) => (
              <Card
                active={true}
                flipped={true}
                key={item.parid}
                item={item}
                handleFlipCard={() => {}}
              />
            ))}
          </div>

          <div className="btns-block4 ">
            <button
              type="button"
              className="btn-primary btn-color-1 btn-size-2 btn-orientation-auto "
              onClick={() => setShowCards(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
      <div className={`screen shadow`}></div>
    </>
  );
};

export default CardsPreview;
