const AbstractManager = require("./AbstractManager");

class DemandManager extends AbstractManager {
  constructor() {
    super({ table: "demand" });
  }

  post({
    Title,
    Deadline,
    Content,
    Utility,
    Context,
    Benefice,
    Inconvenience,
    Complement,
    Statut,
    Note,
    userId,
  }) {
    return this.database.query(
      `insert into ${this.table} 
  (Title,
    Deadline,
    Content,
    Utility,
    Context,
    Benefice,
    Inconvenience, 
    Complement,
    Statut,
    Note,
    userId)
    values (?,?,?,?,?,?,?,?,?,?,?)`,
      [
        Title,
        Deadline,
        Content,
        Utility,
        Context,
        Benefice,
        Inconvenience,
        Complement,
        Statut,
        Note,
        userId,
      ]
    );
  }
}

module.exports = DemandManager;
