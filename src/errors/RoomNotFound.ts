export default class RoomNotFound extends Error {
  constructor() {
    super("Not found Room with given RoomId!");

    this.name = "RoomNotFound";
  }
}
