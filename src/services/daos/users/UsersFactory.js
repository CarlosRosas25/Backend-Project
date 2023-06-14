import UsersMongoDAO from "./UsersMongoDao.js";
import MongoSingleton from "../../../config/mongodb-singleton.js";

class UsersFactoryDAO {
  static get(type) {
    switch (type) {
      case "mongodb":
        const mongoInstance = async () => {
          try {
            await MongoSingleton.getInstance();
          } catch (error) {
            console.error(error);
            process.exit(0);
          }
        };
        mongoInstance();
        return new UsersMongoDAO();

      default:
        console.error("Persistence provider not valid");
        process.exit();
    }
  }
}

export default UsersFactoryDAO;
