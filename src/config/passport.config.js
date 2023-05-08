import passport from "passport";
import passportLocal from "passport-local";
import usersModel from "../models/users.model.js";
import { createHash, isValidPassword } from "../../utils.js";

//Declarar estrategia
const localStrategy = passportLocal.Strategy;

const initializePassport = () => {
  //Strategy register
  passport.use(
    "register",
    new localStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (request, username, password, done) => {
        const { first_name, last_name, email, age } = request.body;
        try {
          const exists = await usersModel.findOne({ email });
          if (exists) {
            console.log("The user already exists.");
            return done(null, false);
          }
          const user = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
          };
          const result = await usersModel.create(user);
          return done(null, result);
        } catch (error) {
          return done("Error registering user: " + error);
        }
      }
    )
  );

  //Strategy login
  passport.use(
    "login",
    new localStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (request, username, password, done) => {
        try {
          const user = await usersModel.findOne({ email: username });
          if (!user) {
            console.warn("User doesn't exists with username: " + username);
            return done(null, false);
          }
          if (!isValidPassword(user, password)) {
            console.warn("Invalid credentials for user: " + username);
            return done(null, false);
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  //Serializacion y desserializacion
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await usersModel.findById(id);
      done(null, user);
    } catch (error) {
      console.error("Error deserializing user: " + error);
    }
  });
};

export default initializePassport;
