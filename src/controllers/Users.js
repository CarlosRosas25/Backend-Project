import UsersService from "../services/Users.js";
import { isValidPassword, generateJWToken, createHash } from "../../utils.js";
import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/errors-enum.js";
import { generateUserCreationErrorInfo } from "../services/errors/messages/user-creation-error.message.js";
import { generateUserLoginErrorInfo } from "../services/errors/messages/user-login-error.message.js";

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

      if (!email || !password) {
        CustomError.createError({
          name: "User Login Error",
          cause: generateUserLoginErrorInfo({
            email,
            password,
          }),
          message: "Error logging in",
          code: EErrors.INVALID_TYPES_ERROR,
        });
      }

      if (!user) {
        request.logger.warning("User doesn't exist with username => " + email);
        return response.status(204).send({
          error: "Not found",
          message: "Couldn't find the username: " + email,
        });
      }

      if (!isValidPassword(user, password)) {
        request.logger.warning("Invalid credentials for user => " + email);
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
      response.status(500).send({ error: error.code, message: error.message });
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

      if (!first_name || !last_name || !email || !age) {
        CustomError.createError({
          name: "User Creation Error",
          cause: generateUserCreationErrorInfo({
            first_name,
            last_name,
            age,
            email,
          }),
          message: "Error creating user",
          code: EErrors.INVALID_TYPES_ERROR,
        });
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
      response.status(500).send({ error: error.code, message: error.message });
    }
  };

  logout = (request, response) => {
    //Not working yet
    response.cookie("jwtCookieToken", "", { maxAge: "1" });
  };
}

export default UsersController;
