const AbstractManager = require("./AbstractManager");

class DemandServiceManager extends AbstractManager {
  constructor() {
    super({ table: "demandServiceJoin" });
  }

  add(DemandId, ServiceId) {
    return this.database.query(
      `insert into ${this.table}(ServiceId, DemandId)values (?,?)`,
      [ServiceId, DemandId]
    );
  }
}

module.exports = DemandServiceManager;
