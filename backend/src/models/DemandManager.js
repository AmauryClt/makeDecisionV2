const AbstractManager = require("./AbstractManager");

class DemandManager extends AbstractManager {
  constructor() {
    super({ table: "demand" });
  }

  add(demand) {
    return this.database.query(
      `insert into ${this.table}(Title,Deadline,Content,Utility,Context,Benefice,Inconvenience,Complement,Serviceimpact,Note)values (?,?,?,?,?,?,?,?,?,?)`,
      [
        demand.Title,
        demand.Deadline,
        demand.Content,
        demand.Utility,
        demand.Context,
        demand.Benefice,
        demand.Inconvenience,
        demand.Complement,
        demand.ServiceImpact,
        demand.Note,
      ]
    );
  }
}

module.exports = DemandManager;
