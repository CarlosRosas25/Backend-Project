import express from "express";
import handlebars from "express-handlebars";
import session from "express-session";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import passport from "passport";
import cookieParser from "cookie-parser";
import initializePassport from "./src/config/passport.config.js";
import __dirname from "./utils.js";
import productsRoutes from "./src/routes/products.routes.js";
import cartRoutes from "./src/routes/cart.routes.js";
import usersRouter from "./src/routes/users.routes.js";
import githubRouter from "./src/routes/github-login.routes.js";
import jwtRoutes from "./src/routes/jwt.routes.js";
import config from "./src/config/config.js";

const app = express();
const SERVER_PORT = config.port;
const DB = config.mongoUrl;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/src/views");
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/src/public"));

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: DB,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 40,
    }),
    secret: "CoffeeShopS3cret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cookieParser("CoderS3cr3tC0d3"));

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/products", productsRoutes);
app.use("/api/carts", cartRoutes);
app.use("/users", usersRouter);
app.use("/github", githubRouter);
app.use("/api/jwt", jwtRoutes);

app.listen(SERVER_PORT, () =>
  console.log(`Server running on Port: ${SERVER_PORT}`)
);

const connectMongoDB = async () => {
  try {
    await mongoose.connect(DB);
    console.log("Successful connection to DB using Mongoose");
  } catch (error) {
    console.log("Error connecting to DB" + error);
    process.exit();
  }
};

connectMongoDB();
