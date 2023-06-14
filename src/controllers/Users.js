import UsersService from "../services/Users.js";
import { isValidPassword, generateJWToken, createHash } from "../../utils.js";

class UsersController {
  constructor() {
    this.usersService = new UsersService();
  }

  viewLogin = (request, response) => {
    response.render("login");
  };

  viewRegister = (request, response) => {
    response.render("register");
  };

  verifyLogin = async (request, response) => {
    try {
      const { email, password } = request.body;
      const user = await this.usersService.getUser(email);

      if (!user) {
        console.warn("User doesn't exist with username: " + email);
        return response.status(204).send({
          error: "Not found",
          message: "Couldn't find the username: " + email,
        });
      }

      if (!isValidPassword(user, password)) {
        console.warn("Invalid credentials for user: " + email);
        return response.status(401).send({
          status: "error",
          error: "Username and password don't match",
        });
      }

      const tokenUserDTO = {
        fullname: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        role: user.role,
        isAdmin: user.is_admin,
      };

      const access_token = generateJWToken(tokenUserDTO);

      response.cookie("jwtCookieToken", access_token, {
        maxAge: 600000,
        httpOnly: true,
      });

      response.send({ message: "Successful login" });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  };

  createUser = async (request, response) => {
    try {
      const { first_name, last_name, email, age, password } = request.body;
      const existingUser = await this.usersService.getUser(email);

      if (existingUser) {
        return response
          .status(401)
          .send({ status: "error", message: "User already exists." });
      }

      let user = {
        first_name,
        last_name,
        email,
        age,
        password: createHash(password),
      };

      if (email === "adminCoder@coder.com") {
        user = {
          ...user,
          role: "admin",
          is_admin: true,
        };
      }

      const result = await this.usersService.createUser(user);

      response.status(201).send({
        status: "success",
        message: "User created successfully with ID: " + result.id,
      });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  };

  logout = (request, response) => {
    //Not working yet
    response.cookie("jwtCookieToken", "", { maxAge: "1" });
  };
}

export default UsersController;
