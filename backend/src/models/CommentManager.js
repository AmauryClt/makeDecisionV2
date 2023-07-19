const AbstractManager = require("./AbstractManager");

class CommentManager extends AbstractManager {
  constructor() {
    super({ table: "interaction" });
  }

  addComment(UserId, demandId, comment) {
    return this.database.query(
      `INSERT INTO ${this.table} (UserId, demand_Id, Comment) VALUES (?, ?, ?)`,
      [UserId, demandId, comment]
    );
  }
}

module.exports = CommentManager;
