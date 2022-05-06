interface Meals {
  text: string;
  Date: string;
  meal_id: string;
  cal: number;
}
export const SET_DATE_MEAL = "SET_DATE_MEAL";
export const ADD_MEAL = "ADD_MEAL";
export const REMOVE_DATE_MEAL = "REMOVE_DATE_MEAL";
export const EDIT_MEAL = "EDIT_MEAL";
const setMeal = (meals: Meals[] | []) => {
  return {
    type: SET_DATE_MEAL,
    payload: meals,
  };
};
const addMeal = (meals: Meals) => {
  return {
    type: ADD_MEAL,
    payload: meals,
  };
};

const removeMeal = (id: string) => {
  return {
    type: REMOVE_DATE_MEAL,
    payload: id,
  };
};
const editMeal = (id: string, newMeal: Meals) => {
  return {
    type: EDIT_MEAL,
    payload: { id, newMeal },
  };
};

export default addMeal;
export { removeMeal, setMeal, editMeal };
