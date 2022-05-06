import client from "../server";

const getMealByDate = async (req, res) => {
  const userId = req.body.userId;
  const date = req.body.date;
  console.log(userId, date);
  const meals = await client

    .from("meals")
    .select("*")
    .match({ user_uid: userId, Date: date });
  res.send(meals.body);
};
const editMeal = async (req, res) => {
  const mealId = req.body.mealId;
  client.from("meal");
};

export default getMealByDate;
