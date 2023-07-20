const AbstractManager = require("./AbstractManager");

class InteractionManager extends AbstractManager {
  constructor() {
    super({ table: "interaction" });
  }

  addInteraction(interaction) {
    return this.database.query(
      `INSERT INTO ${this.table} (DemandId, UserId, Note) VALUES (?, ?, ?)`,
      [interaction.DemandId, interaction.UserId, interaction.Note]
    );
  }

  modifInteraction(interaction) {
    return this.database.query(
      `UPDATE ${this.table} SET Note = ? WHERE DemandId = ? AND UserId = ?`,
      [interaction.Note, interaction.DemandId, interaction.UserId]
    );
  }

  findNoteByDemandId(demandId) {
    const sqlQuery = `
      SELECT *
      FROM ${this.table}
      WHERE DemandId = ?;
    `;

    return this.database
      .query(sqlQuery, [demandId])
      .then((results) => results[0]);
  }

  findUserByDemandId(demandId) {
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

module.exports = InteractionManager;
