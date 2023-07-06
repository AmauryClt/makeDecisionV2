const AbstractManager = require("./AbstractManager");

class DemandManager extends AbstractManager {
  constructor() {
    super({ table: "demand" });
  }

  // add(demand) {
  //   return this.database.query(
  //     `insert into ${this.table}(Title,Deadline,Content,Utility,Context,Benefice,Inconvenience,Serviceimpact,Note)values (?,?,?,?,?,?,?,?,?)`,
  //     [
  //       demand.Title,
  //       demand.Deadline,
  //       demand.Content,
  //       demand.Utility,
  //       demand.Context,
  //       demand.Benefice,
  //       demand.Inconvenience,
  //       demand.ServiceImpact,
  //       demand.Note,
  //     ]
  //   );
  // }

  add(demand) {
    return this.database.query(
      `INSERT INTO demand (Title, Deadline, Content, Utility, Context, Benefice, Inconvenience, ServiceImpact, Note)
SELECT ?, ?, ?, ?, ?, ?, ?, serv.Id, ?
FROM serv
INNER JOIN demand ON serv.Serv = ?`,
      [
        demand.Title,
        demand.Deadline,
        demand.Content,
        demand.Utility,
        demand.Context,
        demand.Benefice,
        demand.Inconvenience,
        demand.ServiceImpact,
        demand.Note,
        demand.ServiceImpact,
      ]
    );
  }
}

module.exports = DemandManager;
