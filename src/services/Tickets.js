import config from "../config/config.js";
import TicketsFactoryDAO from "./daos/tickets/TicketsFactory.js";

class TicketsService {
  constructor() {
    this.ticketsDAO = TicketsFactoryDAO.get(config.PERSISTENCE);
  }

  async createTicket(products, user) {
    await this.ticketsDAO.createTicket(products, user);
  }
}

export default TicketsService;
