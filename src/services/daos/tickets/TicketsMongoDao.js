import ticketsModel from "../../../models/ticket.model.js";

class TicketsMongoDAO {
  constructor() {
    this.collection = ticketsModel;
  }

  createTicket = async (products, user) => {
    let totalAmount = 0;

    products.forEach((product) => {
      totalAmount = product.product.price * product.quantity + totalAmount;
    });

    const ticket = {
      code: String(
        Date.now().toString(32) + Math.random().toString(16)
      ).replace(/\./g, ""),
      amount: totalAmount,
      purchaser: user.email,
    };

    await this.collection.create(ticket);
  };
}

export default TicketsMongoDAO;
