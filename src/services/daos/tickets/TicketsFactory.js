import TicketsMongoDAO from "./TicketsMongoDao.js";

class TicketsFactoryDAO {
  static get(type) {
    switch (type) {
      case "mongodb":
        return new TicketsMongoDAO();

      default:
        console.error("Persistence provider not valid");
        process.exit();
    }
  }
}

export default TicketsFactoryDAO;
