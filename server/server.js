import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
const app = express();
import dotenv from "dotenv";
import getUsers, { createUser, signInUser } from "./routes/users.js";
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
    app.post("/getUser", getUsers);
    app.post("/signUpuser", createUser);
    app.post("/signInUser", signInUser);

    app.listen(PORT, () => {
      console.log(`Server is listening on ${PORT} `);
    });
  }
} catch (error) {
  console.log("error", error);
}

export default client;
