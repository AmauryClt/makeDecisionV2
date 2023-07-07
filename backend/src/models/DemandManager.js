const AbstractManager = require("./AbstractManager");

class DemandManager extends AbstractManager {
  constructor() {
    super({ table: "demand" });
  }

  add(demand) {
    return this.database.query(
      `insert into ${this.table}(Title,Deadline,Content,Utility,Context,Benefice,Inconvenience,Note)values (?,?,?,?,?,?,?,?)`,
      [
        demand.Title,
        demand.Deadline,
        demand.Content,
        demand.Utility,
        demand.Context,
        demand.Benefice,
        demand.Inconvenience,
        demand.Note,
      ]
    );
  }
}

module.exports = DemandManager;
