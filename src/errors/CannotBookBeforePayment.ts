export default class CannotBookBeforePayment extends Error {
  constructor() {
    super("Cannot book room before payment confirmed!");

    this.name = "CannotBookBeforePayment";
  }
}
