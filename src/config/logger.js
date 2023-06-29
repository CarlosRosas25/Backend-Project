import winston from "winston";
import config from "./config.js";

const customLevelsOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "red",
    error: "magenta",
    warning: "yellow",
    info: "blue",
    http: "green",
    debug: "white",
  },
};

const devLogger = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new winston.transports.Console(
      {
        level: "debug",
        format: winston.format.combine(
          winston.format.colorize({ colors: customLevelsOptions.colors }),
          winston.format.simple()
        ),
      },
      {
        level: "http",
        format: winston.format.combine(
          winston.format.colorize({ colors: customLevelsOptions.colors }),
          winston.format.simple()
        ),
      },
      {
        level: "info",
        format: winston.format.combine(
          winston.format.colorize({ colors: customLevelsOptions.colors }),
          winston.format.simple()
        ),
      },
      {
        level: "warning",
        format: winston.format.combine(
          winston.format.colorize({ colors: customLevelsOptions.colors }),
          winston.format.simple()
        ),
      }
    ),

    new winston.transports.File(
      {
        filename: "./errors.log",
        level: "error",
        format: winston.format.simple(),
      },
      {
        filename: "./errors.log",
        level: "fatal",
        format: winston.format.simple(),
      }
    ),
  ],
});

const prodLogger = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new winston.transports.Console(
      {
        level: "info",
        format: winston.format.combine(
          winston.format.colorize({ colors: customLevelsOptions.colors }),
          winston.format.simple()
        ),
      },
      {
        level: "warning",
        format: winston.format.combine(
          winston.format.colorize({ colors: customLevelsOptions.colors }),
          winston.format.simple()
        ),
      }
    ),

    new winston.transports.File(
      {
        filename: "./errors.log",
        level: "error",
        format: winston.format.simple(),
      },
      {
        filename: "./errors.log",
        level: "fatal",
        format: winston.format.simple(),
      }
    ),
  ],
});

export const addLogger = (request, response, next) => {
  if (config.environment === "development") {
    request.logger = devLogger;
  } else {
    request.logger = prodLogger;
  }
  //request.logger.http(`${request.method} in ${request.url}
  //- at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`);
  next();
};
