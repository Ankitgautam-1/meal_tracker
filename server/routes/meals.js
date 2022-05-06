
import client from "../server";

const getMealByUser = async (req, res) => {
  const user = await client.from("users").select("*").eq("uid", req.body.id);
  console.log(user);
  if (user.error != null) {
    res.status(user.error.message).send(user.error.message);
  } else {
    user.data.map((user) => {
      console.log(user.meals);
    });
    res.status(201).send(user.data);
  }
};

export default getMealByUser;