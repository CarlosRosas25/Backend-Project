import { Router } from "express";
import passport from "passport";

const sessionsRouter = Router();

sessionsRouter.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/api/sessions/fail-register",
  }),
  async (request, response) => {
    console.log("Registering new user");
    response
      .status(201)
      .send({ status: "success", message: "User created successfully." });
  }
);

sessionsRouter.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/sessions/fail-login",
  }),
  async (request, response) => {
    console.log("User found to login");
    const user = request.user;
    console.log(user);

    if (!user)
      return response
        .status(401)
        .send({ status: "error", error: "Username and password don't match!" });

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
  }
);

sessionsRouter.get("/fail-register", (request, response) => {
  response.status(401).send({ error: "Failed to process register." });
});

sessionsRouter.get("/fail-login", (request, response) => {
  response.status(401).send({ error: "Failed to process login." });
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
