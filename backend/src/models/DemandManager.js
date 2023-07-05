const AbstractManager = require("./AbstractManager");

class DemandManager extends AbstractManager {
  constructor() {
    super({ table: "demand" });
  }

  add(demand) {
    return this.database.query(
      `insert into ${this.table}(Title,Deadline,Content,Utility,Context,Benefice,Inconvenience,Complement,Statut,Note,userId)values (?,?,?,?,?,?,?,?,?,?,?)`,
      [
        demand.Title,
        demand.Deadline,
        demand.Content,
        demand.Utility,
        demand.Context,
        demand.Benefice,
        demand.Inconvenience,
        demand.Complement,
        demand.Statut,
        demand.Note,
        demand.userId,
      ]
    );
  }
}

module.exports = DemandManager;
