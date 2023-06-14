import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Generar HASH
export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

//Validar el password con la que esta en la DB como hash
export const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

//JSON Web Tokens JWT functions
export const PRIVATE_KEY = "CoderhouseBackendCourseSecretKeyJWT";

export const generateJWToken = (user) => {
  return jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "24h" });
};

export const authToken = (request, response, next) => {
  const authHeader = request.headers.authorization;
  console.log("Token present in header auth: ");
  console.log(authHeader);

  if (!authHeader) {
    return response
      .status(401)
      .send({ error: "User not authenticated or missing token." });
  }

  const token = authHeader.split("")[1];
  jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
    if (error)
      return response
        .status(403)
        .send({ error: "Token invalid, Unathorized!" });
    request.user = credentials.user;
    console.log(request.user);
    next();
  });
};

//Para manejo de errores
export const passportCall = (strategy) => {
  return async (request, response, next) => {
    console.log("Calling strategy: ");
    console.log(strategy);
    passport.authenticate(strategy, function (err, user, info) {
      if (err) return next(err);
      if (!user) {
        return response
          .status(401)
          .send({ error: info.messages ? info.messages : info.toString() });
      }
      console.log("User got from strategy: ");
      console.log(user);
      request.user = user;
      next();
    })(request, response, next);
  };
};

//Para manejo de Auth
export const authorization = (roles) => {
  return async (request, response, next) => {
    if (!request.user)
      return response.status(401).send("Unauthorized: User not found in JWT");
    if (!roles.includes(request.user.role)) {
      return response
        .status(403)
        .send("Forbidden: User doesn't have permissions with this role.");
    }
    next();
  };
};

export default __dirname;
