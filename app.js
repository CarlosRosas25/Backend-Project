import express from "express";
import handlebars from "express-handlebars";
import passport from "passport";
import cookieParser from "cookie-parser";
import initializePassport from "./src/config/passport.config.js";
import __dirname from "./utils.js";
import UsersJwtRouter from "./src/routes/users.routes.js";
import ProductsRouter from "./src/routes/products.routes.js";
import CartsRoutes from "./src/routes/carts.routes.js";
import MockingProductsRouter from "./src/routes/mocks.routes.js";
import LoggersRoutes from "./src/routes/loggers.routes.js";
//import githubRouter from "./src/routes/github-login.routes.js";
import config from "./src/config/config.js";
import { Server } from "socket.io";
import errorHandler from "./src/services/errors/middlewares/index.js";
import { addLogger } from "./src/config/logger.js";

const app = express();
const SERVER_PORT = config.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(addLogger);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/src/views");
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/src/public"));

app.use(cookieParser("CoderS3cr3tC0d3"));

initializePassport();
app.use(passport.initialize());

const usersRouter = new UsersJwtRouter();
const productsRouter = new ProductsRouter();
const cartsRouter = new CartsRoutes();
const mocksRouter = new MockingProductsRouter();
const loggersRouter = new LoggersRoutes();

app.use("/api/users", usersRouter.start());
app.use("/api/products", productsRouter.start());
app.use("/api/carts", cartsRouter.start());
app.use("/api/mockingproducts", mocksRouter.start());
app.use("/loggerTest", loggersRouter.start());
//app.use("/github", githubRouter);

app.use(errorHandler);

const socketServer = new Server(
  app.listen(SERVER_PORT, () =>
    console.log(`Server running on Port: ${SERVER_PORT}`)
  )
);

let messages = [];

socketServer.on("connection", (socket) => {
  socket.on("message", (data) => {
    messages.push(data);
    socketServer.emit("messageLogs", messages);
  });
});
