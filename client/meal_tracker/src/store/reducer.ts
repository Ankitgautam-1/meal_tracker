import { combineReducers } from "@reduxjs/toolkit";
import { REMOVE_USER, SET_USER } from "./actions";
import {
  SET_DATE_MEAL,
  REMOVE_DATE_MEAL,
  EDIT_MEAL,
  ADD_MEAL,
} from "./mealActions";
interface Action {
  type: String;
  payload: any;
}
interface Meals {
  text: string;
  Date: string;
  meal_id: string;
  cal: number;
}
interface User {
  uid: String;
  email: String;
  username: String;
}
const initialstate: null | User = null;
const userReducer = (state: null | User = initialstate, action: Action) => {
  switch (action.type) {
    case SET_USER:
      return (state = action.payload);
    case REMOVE_USER:
      return (state = null);
    default:
      return state;
  }
};
const mealReducer = (state: any[] = [], action: Action) => {
  switch (action.type) {
    case SET_DATE_MEAL:
      return (state = action.payload);
    case REMOVE_DATE_MEAL:
      return (state = state.filter((meal) => meal.meal_id !== action.payload));
    case EDIT_MEAL:
      return () => {
        const id = state.findIndex((meal: Meals) => {
          return meal.meal_id === action.payload.id;
        });
        state[id] = action.payload.newMeal;
        return state;
      };
    case ADD_MEAL:
      return (state = [...state, action.payload]);
    default:
      return state;
  }
};

const reducer = combineReducers({
  userReducer: userReducer,
  mealReducer: mealReducer,
});

export default reducer;
