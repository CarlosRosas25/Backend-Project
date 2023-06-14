import CartsMongoDAO from "./CartsMongoDao.js";

class CartsFactoryDAO {
  static get(type) {
    switch (type) {
      case "mongodb":
        return new CartsMongoDAO();

      default:
        console.error("Persistence provider not valid");
        process.exit();
    }
  }
}

export default CartsFactoryDAO;
