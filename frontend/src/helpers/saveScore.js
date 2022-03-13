import { catchError } from "./catchError";
import apiClient from "../helpers/apiClient";
import formatTime from "./formatTimer";

export const saveScore = async (
  numberPlayers,
  endGame,
  score,
  dataPlayers,
  timer
) => {
  if (numberPlayers === 1 && endGame) {
    try {
      const url = "/ranking";

      const values = {
        name: dataPlayers[0].name,
        score,
        time: formatTime(timer),
        avatar: dataPlayers[0].avatar,
      };

      const response = await apiClient.post(url, values);
      console.log(response);
    } catch (error) {
      console.log(error);

      throw new Error(catchError(error));
    }
  }
};
