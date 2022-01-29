export default class ConflictInTimeActivity extends Error {
  constructor() {
    super("Conflict in Activity time!");
      
    this.name = "ConflictInTimeActivity";
  }
}
  
