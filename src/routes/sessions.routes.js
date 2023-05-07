import { Router } from "express";
import usersModel from "../models/users.model.js";
import { createHash, isValidPassword } from "../../utils.js";

const sessionsRouter = Router();

sessionsRouter.post("/register", async (request, response) => {
  const { first_name, last_name, email, age, password } = request.body;

  const exists = await usersModel.findOne({ email });

  if (exists) {
    return response
      .status(400)
      .send({ status: "error", msg: "Can't register an existing user." });
  }

  const user = {
    first_name,
    last_name,
    email,
    age,
    password: createHash(password),
  };

  const result = await usersModel.create(user);
  response.status(201).send({
    status: "success",
    msg: "User created successfully with ID: " + result.id,
  });
});

sessionsRouter.post("/login", async (request, response) => {
  const { email, password } = request.body;
  const user = await usersModel.findOne({ email });

  if (!user) {
    return response
      .status(401)
      .send({ status: "error", error: "Invalid credentials" });
  }

  if (!isValidPassword(user, password)) {
    return response
      .status(401)
      .send({ status: "error", error: "Invalid credentials" });
  }

  request.session.admin = false;

  if (user.email === "adminCoder@coder.com") {
    request.session.admin = true;
  }

  request.session.user = {
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    rol: `${request.session.admin ? "admin" : "user"}`,
  };

  response.send({
    status: "success",
    payload: request.session.user,
    message: "First log in!!!!!",
  });
});

sessionsRouter.get("/logout", (request, response) => {
  request.session.destroy((error) => {
    if (error) {
      response
        .status(401)
        .json({ error: "Logout error", msg: "Error loging out" });
    }
    response.status(201).send("Successful log out!");
  });
});

export default sessionsRouter;
