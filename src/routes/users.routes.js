import { Router } from "express";

const usersRouter = Router();

usersRouter.get("/login", (request, response) => {
  response.render("login");
});

usersRouter.get("/register", (request, response) => {
  response.render("register");
});

export default usersRouter;
