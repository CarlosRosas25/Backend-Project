import ticketsModel from "../../../models/ticket.model.js";

class TicketsMongoDAO {
  constructor() {
    this.collection = ticketsModel;
  }

  createTicket = async (products, user) => {
    console.log(products, user);
  };
}

export default TicketsMongoDAO;
