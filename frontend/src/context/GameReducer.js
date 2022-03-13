import { types } from "../types/types";

export const GameReducer = (state = {}, action) => {
  switch (action.type) {
    case types.LOGIN:
    case types.LOGOUT:
    case types.SET_CARDS_GAME:
    case types.RESET:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
