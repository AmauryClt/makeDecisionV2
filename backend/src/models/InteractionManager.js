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

  findNoteByDemandId(interaction) {
    const sqlQuery = `
    SELECT c.note
    FROM ${this.table} AS c
    JOIN user AS u ON c.UserId = u.Id
    WHERE c.UserId = ?;
  `;

    console.info("SQL Query:", sqlQuery);
    console.info("Interaction UserId:", interaction.UserId);

    return this.database.query(sqlQuery, [interaction.UserId]);
  }
}

module.exports = InteractionManager;
