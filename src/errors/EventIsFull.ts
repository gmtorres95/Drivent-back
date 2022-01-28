export default class EventIsFull extends Error {
  constructor() {
    super("This event has reach its maximum capacity!");
      
    this.name = "EventIsFull";
  }
}
