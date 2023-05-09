import { Router } from "express";

const githubRouter = Router();

githubRouter.get("/login", (request, response) => {
  response.render("github-login");
});

githubRouter.get("/", (request, response) => {
  response.redirect("/api/products");
});

githubRouter.get("/error", (request, response) => {
  response.render("error", { error: "Couldn't authenticate using Github." });
});

export default githubRouter;
