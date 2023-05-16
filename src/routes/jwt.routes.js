import { Router } from "express";
import usersModel from "../models/users.model.js";
import { isValidPassword } from "../../utils.js";
import { generateJWToken } from "../../utils.js";

const jwtRoutes = Router();

jwtRoutes.post("/login", async (request, response) => {
  const { email, password } = request.body;
  try {
    const user = await usersModel.findOne({ email: email });
    console.log("Usuario encontrado para login: ");
    console.log(user);

    if (!user) {
      console.warn("User doesn't exist with username: " + email);
      return response.status(204).send({
        error: "Not found",
        message: "Couldn't find the username: " + email,
      });
    }

    if (!isValidPassword) {
      console.warn("Invalid credentials for user: " + email);
      return response.status(401).send({
        status: "error",
        error: "Username and password don't match",
      });
    }

    const tokenUser = {
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      age: user.age,
      role: user.role,
    };

    const access_token = generateJWToken(tokenUser);
    console.log(access_token);

    response.cookie("jwtCookieToken", access_token, {
      maxAge: 60000,
      httpOnly: true,
    });

    response.send({ message: "Successful login" });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .send({ status: "error", error: "Inside app error" });
  }
});

/* jwtRoutes.get("/logout", (request, response) => {
  request.destroy((error) => {
    if (error) {
      response
        .status(401)
        .json({ error: "Logout error", msg: "Error loging out" });
    }
    response.status(201).send("Successful log out!");
  });
}); */

export default jwtRoutes;
