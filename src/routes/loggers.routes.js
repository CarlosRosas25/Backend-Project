import { Router } from "express";

const loggersRoutes = Router();

class LoggersRoutes {
  start() {
    loggersRoutes.get("/", (request, response) => {
      request.logger.fatal("Testing fatal level log!");
      request.logger.error("Testing error level log!");
      request.logger.warning("Testing warning level log!");
      request.logger.info("Testing info level log!");
      request.logger.http("Testing http level log!");
      request.logger.debug("Testing debug level log!");

      response.send({ message: "Logger test!" });
    });
    return loggersRoutes;
  }
}

export default LoggersRoutes;
