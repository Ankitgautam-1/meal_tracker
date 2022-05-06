import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
const app = express();
import { v4 } from "uuid";
import dotenv from "dotenv";
import getUsers, {
  createUser,
  signInUser,
  signOutUser,
} from "./routes/users.js";
import bodyParser from "body-parser";
dotenv.config();
app.use(cors());
const PORT = process.env.PORT || 3030;
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const client = createClient(supabaseUrl, supabaseAnonKey);
try {
  if (client) {
    app.use(express.json());
    app.use(
      express.urlencoded({
        extended: true,
      })
    );
    app.post("/getMealByDate", async (req, res) => {
      const userId = req.body.userId;
      const date = req.body.date;
      console.log(userId, date);
      const meals = await client

        .from("meals")
        .select("*")
        .match({ user_uid: userId, Date: date });

      if (meals.error === null) {
        res.status(201).send(meals.body);
      } else {
        res.status(meals.status).send(meals.error);
      }
    });
    app.post("/addMeal", async (req, res) => {
      const userId = req.body.userId;
      const date = req.body.date;
      const text = req.body.text;
      const cal = req.body.cal;
      const result = await client.from("meals").insert({
        meal_id: v4(),
        Date: date,
        text: text,
        cal: cal,
        user_uid: userId,
      });
      if (result.error === null) {
        const meals = await client

          .from("meals")
          .select("*")
          .match({ user_uid: userId, Date: date });
        if (meals.error === null) {
          res.status(201).send(meals.body);
        } else {
          res.status(meals.status).send(meals.error);
        }
      } else {
        res.status(result.status).send(result.error);
      }
    });
    app.post("/editMeal", async (req, res) => {
      const mealId = req.body.mealId;
      const userId = req.body.userId;
      const date = req.body.date;
      const text = req.body.text;
      const cal = req.body.cal;
      console.log(mealId, userId, text, cal);
      const result = await client
        .from("meals")
        .update({
          text: text,
          cal: cal,
        })
        .match({ meal_id: mealId });
      if (result.error === null) {
        const meals = await client
          .from("meals")
          .select("*")
          .match({ user_uid: userId, Date: date });
        if (meals.error === null) {
          res.status(201).send(meals.body);
        } else {
          res.status(meals.status).send(meals.error);
        }
      } else {
        res.status(result.status).send("Something went wrong");
      }
    });
    app.post("/deleteMeal", async (req, res) => {
      const mealId = req.body.mealId;
      const userId = req.body.userId;
      const date = req.body.date;
      console.log(mealId);
      const result = await client.from("meals").delete().match({
        meal_id: mealId,
      });
      if (result.error === null) {
        const meals = await client

          .from("meals")
          .select("*")
          .match({ user_uid: userId, Date: date });
        console.log(meals);
        if (meals.error === null) {
          res.status(201).send(meals.data);
        } else {
          res.status(meals.status).send(meals.error);
        }
      } else {
        res.status(result.status).send(result.error);
      }
    });
    app.post("/getUser", getUsers);
    app.post("/signUpuser", createUser);
    app.post("/signInUser", signInUser);
    app.get("/signOutUser", signOutUser);
    app.listen(PORT, () => {
      console.log(`Server is listening on ${PORT} `);
    });
  }
} catch (error) {
  console.log("error", error);
}

export default client;
