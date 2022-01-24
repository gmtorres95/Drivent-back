export default class UserAlreadyWithTicket extends Error {
  constructor() {
    super("User cant have more than one ticket per time!");
  
    this.name = "UserAlreadyWithTicket";
  }
}
  
