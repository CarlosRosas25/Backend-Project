import usersModel from "../../../models/users.model.js";

class UsersMongoDAO {
  constructor() {
    this.collection = usersModel;
  }

  getUser = async (email) => {
    const user = await this.collection.findOne({ email: email });
    console.log("Usuario encontrado para login: ");
    console.log(user);

    return user;
  };

  createUser = async (user) => {
    return await this.collection.create(user);
  };
}

export default UsersMongoDAO;
