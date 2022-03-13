import React from "react";

const Card = ({ item, flipped = false, active, handleFlipCard }) => {
  return (
    <div
      className={`flip-card ${flipped ? "flipped" : ""} ${
        !active ? "disabled" : ""
      }`}
      onClick={() => handleFlipCard(item.nanoId, item.parid, active)}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front"></div>

        <div className={`flip-card-back `}>
          <img
            src={flipped ? item.url : require("../assets/images/idontknow.jpg")}
            alt="Avatar"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
