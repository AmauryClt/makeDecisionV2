const AbstractManager = require("./AbstractManager");

class DemandManager extends AbstractManager {
  constructor() {
    super({ table: "demand" });
  }

  add(demand) {
    return this.database.query(
      `insert into ${this.table}(Title,Deadline,Content,Benefice,Inconvenience) values (?,?,?,?,?)`,
      [
        demand.Title,
        demand.Deadline,
        demand.Content,
        demand.Benefice,
        demand.Inconvenience,
      ]
    );
  }

  update(demand) {
    return this.database.query(
      `update ${this.table} set Title = ?, Deadline = ?, Content= ?, Benefice= ?, Inconvenience= ? where Id=?`,
      [
        demand.Title,
        demand.Deadline,
        demand.Content,
        demand.Benefice,
        demand.Inconvenience,
        demand.Id,
      ]
    );
  }
}

module.exports = DemandManager;
