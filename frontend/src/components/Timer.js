import React from "react";
import formatTime from "../helpers/formatTimer";

const Timer = ({ timer }) => {
  return (
    <div className="timer-container">
      <div className="timer">
        <p>{formatTime(timer)}</p>
      </div>
    </div>
  );
};

export default Timer;
