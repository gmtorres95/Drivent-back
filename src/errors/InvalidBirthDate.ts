export default class InvalidBirthDateError extends Error {
  constructor() {
    super("Invalid birth date! User must be at least 18 years old");
    
    this.name = "InvalidBirthDateError";
  }
}
