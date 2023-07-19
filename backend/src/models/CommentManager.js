const AbstractManager = require("./AbstractManager");

class CommentManager extends AbstractManager {
  constructor() {
    super({ table: "commentary" });
  }

  addComment(UserId, DemandId, Comment) {
    return this.database.query(
      `INSERT INTO ${this.table} (UserId, DemandId, Comment) VALUES (?, ?, ?)`,
      [UserId, DemandId, Comment]
    );
  }

  findCommentsByDemandId(demandId) {
    return this.database.query(
      `
        SELECT c.*, u.Firstname, u.Lastname 
        FROM ${this.table} AS c
        JOIN user AS u ON c.UserId = u.Id
        WHERE c.DemandId = ?;
    `,
      [demandId]
    );
  }
}

module.exports = CommentManager;
