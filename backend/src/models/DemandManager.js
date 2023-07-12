const AbstractManager = require("./AbstractManager");

class DemandManager extends AbstractManager {
  constructor() {
    super({ table: "demand" });
  }

  findAll() {
    return this.database.query(
      `select demand.Title, demand.Content, demand.Benefice, demand.Inconvenience, demand.Deadline, demand.Note, demand.Statut, demand.Id, user.Lastname, user.Firstname from  ${this.table} INNER JOIN user ON user.Id = ${this.table}.userId`
    );
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
