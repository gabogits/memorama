import { catchError } from "./catchError";
import apiClient from "../helpers/apiClient";

export const getScores = async () => {
  try {
    const url = "/ranking";
    let response = await apiClient.get(url);

    return response.data;
  } catch (error) {
    return catchError(error);
  }
};
