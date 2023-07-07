const AbstractManager = require("./AbstractManager");

class DemandManager extends AbstractManager {
  constructor() {
    super({ table: "demand" });
  }

  add(demand) {
    return this.database.query(
      `insert into ${this.table}(Title,Deadline,Content,Benefice,Inconvenience)values (?,?,?,?,?)`,
      [
        demand.Title,
        demand.Deadline,
        demand.Content,
        demand.Benefice,
        demand.Inconvenience,
      ]
    );
  }
}

module.exports = DemandManager;
