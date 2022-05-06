import client from "../server.js";

const getUsers = async (req, res) => {
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
const signOut = async (req, res) => {
  const result = await client.auth.signOut();

  if (result.error === null) {
    res.status(200).send("User Signed out");
  } else {
    res.status(500).send(result.error);
  }
};
const signIn = async (req, res) => {
  const email = req.body.userDetails.email;

  const password = req.body.userDetails.password;
  console.log(email, password);
  try {
    const user = await client.auth.signIn({
      email,
      password,
    });
    const users = await client
      .from("users")
      .select("*")
      .eq("uid", user.user.id);
    console.log("current user", client.auth.user());
    if (users.body === null) {
      res.status(user.error.status).send(user.error.message);
      return;
    } else {
      res.status(201).send(users.body[0]);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("user not found");
  }
};

const addUser = async (req, res) => {
  const email = req.body.userDetails.email;
  const username = req.body.userDetails.username;
  const password = req.body.userDetails.password;
  try {
    const newuser = await client.auth.signUp({ email, password });
    console.log(newuser.user);
    if (newuser.error != null) {
      res.status(newuser.error.status).send(newuser.error.message);
      return;
    } else {
      try {
        const result = await client.from("users").insert({
          uid: newuser.user.id,
          username: username,
          email: email,
        });
        if (result.error) {
          res.status(result.error.code).send(result.error.message);
        } else {
          res
            .status(201)
            .send({ uid: newuser.user.id, username: username, email: email });
        }
      } catch (e) {
        console.log(e);
      }
    }
  } catch (error) {
    res.send("error");
  }
};

export default getUsers;
export const createUser = addUser;
export const signInUser = signIn;
export const signOutUser = signOut;
