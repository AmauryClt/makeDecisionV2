const AbstractManager = require("./AbstractManager");

class DemandManager extends AbstractManager {
  constructor() {
    super({ table: "demand" });
  }

  findAllWithUser() {
    return this.database.query(`
      SELECT demand.*, user.Lastname, user.Firstname, GROUP_CONCAT(impactedService.Service SEPARATOR ', ') AS ServicesImpacts
      FROM demand
      INNER JOIN user ON demand.userId = user.Id
      LEFT JOIN demandServiceJoin ON demand.Id = demandServiceJoin.DemandId
      LEFT JOIN impactedService ON demandServiceJoin.ServiceId = impactedService.Id
      GROUP BY demand.Id
    `);
  }

  find(id) {
    return this.database.query(
      `
      SELECT demand.*, user.Lastname, user.Firstname, GROUP_CONCAT(impactedService.Service SEPARATOR ', ') AS ServicesImpacts
      FROM demand
      INNER JOIN user ON demand.userId = user.Id
      LEFT JOIN demandServiceJoin ON demand.Id = demandServiceJoin.DemandId
      LEFT JOIN impactedService ON demandServiceJoin.ServiceId = impactedService.Id
      where demand.Id = ?`,
      [id]
    );
  }

  add(demand) {
    return this.database.query(
      `insert into ${this.table}(Title,Deadline,Content,Benefice,Inconvenience,UserId) values (?,?,?,?,?,?)`,
      [
        demand.Title,
        demand.Deadline,
        demand.Content,
        demand.Benefice,
        demand.Inconvenience,
        demand.UserId,
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
