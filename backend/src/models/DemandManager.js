const AbstractManager = require("./AbstractManager");

class DemandManager extends AbstractManager {
  constructor() {
    super({ table: "demand" });
  }

  getAllDemands() {
    return this.findAll();
  }
}

module.exports = DemandManager;
