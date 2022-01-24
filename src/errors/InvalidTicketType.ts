export default class InvalidTicketType extends Error {
  constructor() {
    super("Invalid Body for Ticket type!");
    
    this.name = "InvalidTicketType";
  }
}
  
