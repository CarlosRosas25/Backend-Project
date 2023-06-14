import { Router } from "express";
import UsersController from "../controllers/Users.js";

const jwtUsersRoutes = Router();

class UsersJwtRouter {
  constructor() {
    this.usersController = new UsersController();
  }

  start() {
    jwtUsersRoutes.get("/login", this.usersController.viewLogin);
    jwtUsersRoutes.get("/register", this.usersController.viewRegister);
    jwtUsersRoutes.post("/login", this.usersController.verifyLogin);
    jwtUsersRoutes.post("/register", this.usersController.createUser);
    jwtUsersRoutes.get("/logout", this.usersController.logout);

    return jwtUsersRoutes;
  }
}

export default UsersJwtRouter;
