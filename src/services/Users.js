import config from "../config/config.js";
import UsersFactoryDAO from "./daos/users/UsersFactory.js";

class UsersService {
  constructor() {
    this.usersDAO = UsersFactoryDAO.get(config.PERSISTENCE);
  }

  async getUser(email) {
    const user = await this.usersDAO.getUser(email);
    return user;
  }

  async createUser(user) {
    return await this.usersDAO.createUser(user);
  }
}

export default UsersService;
