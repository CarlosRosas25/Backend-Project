import passport from "passport";
import passportLocal from "passport-local";
import GitHubStrategy from "passport-github2";
import usersModel from "../models/users.model.js";
import { createHash, isValidPassword } from "../../utils.js";

//Declarar estrategia
const localStrategy = passportLocal.Strategy;

const initializePassport = () => {
  //Strategy Github
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "Iv1.1a9ad483a821cb4e",
        clientSecret: "4c64162779a3526221bbf4b9cd7e4dcfc5ccb6e5",
        callbackUrl: "http://localhost:8080/api/sessions/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("Profile obtenido del usuario: ");
        console.log(profile);

        try {
          const user = await usersModel.findOne({ email: profile._json.email });
          console.log("Usuario encontrado para login: ");
          console.log(user);

          if (!user) {
            console.warn(
              "User doesn't exists with username: " + profile._json.email
            );
            let newUser = {
              first_name: profile._json.name,
              last_name: "",
              email: profile._json.email,
              age: 18,
              password: "",
              loggedBy: "GitHub",
            };
            const result = await usersModel.create(newUser);
            return done(null, result);
          } else {
            return done(null, user);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

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
