import passport from "passport";
//import GitHubStrategy from "passport-github2";
import jwtStrategy from "passport-jwt";
import usersModel from "../models/users.model.js";
import { PRIVATE_KEY } from "../../utils.js";

//Declarar estrategia
const JwtStrategy = jwtStrategy.Strategy;
const ExtractJWT = jwtStrategy.ExtractJwt;

const initializePassport = () => {
  //Strategy JWT
  passport.use(
    "jwt",
    new JwtStrategy(
      {
        //Extract cookie
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY,
      },
      async (jwt_payload, done) => {
        try {
          console.log("JWT got from payload");
          console.log(jwt_payload);
          return done(null, jwt_payload.user);
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );

  //Serialize and deserialize
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, request, done) => {
    try {
      let user = await usersModel.findById(id);
      done(null, user);
    } catch (error) {
      request.logger.error("Error deserializing user: " + error);
    }
  });
};

//Function to extract cookie
const cookieExtractor = (request) => {
  let token = null;
  if (request && request.cookies) {
    token = request.cookies["jwtCookieToken"];
    request.logger.info(`Token got from cookie => ${token}`);
  }
  return token;
};

export default initializePassport;

//Strategy Github
/* passport.use(
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
  ); */
