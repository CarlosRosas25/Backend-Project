import express from "express";
import handlebars from "express-handlebars";
import session from "express-session";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import __dirname from "./utils.js";
import productsRoutes from "./src/routes/products.routes.js";
import cartRoutes from "./src/routes/cart.routes.js";
import usersRouter from "./src/routes/users.routes.js";
import sessionsRouter from "./src/routes/sessions.routes.js";

const app = express();
const PORT = 8080;
const DB =
  "mongodb+srv://admin:3V8rAx1pGMRJArL3@cluster0.cythgpt.mongodb.net/test";

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

app.use("/api/products", productsRoutes);
app.use("/api/carts", cartRoutes);
app.use("/users", usersRouter);
app.use("/api/sessions", sessionsRouter);

app.listen(PORT, () => console.log(`Server running on Port: ${PORT}`));

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
