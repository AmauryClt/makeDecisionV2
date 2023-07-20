class AbstractManager {
  constructor({ table }) {
    this.table = table;
  }

  find(id) {
    return this.database.query(`select * from  ${this.table} where Id = ?`, [
      id,
    ]);
  }

  findAll() {
    return this.database.query(`select * from  ${this.table}`);
  }

  delete(id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }

  setDatabase(database) {
    this.database = database;
  }

  add(data) {
    const columns = Object.keys(data).join(",");
    const values = Object.values(data);

    const placeholders = values.map(() => "?").join(",");
    const query = `INSERT INTO ${this.table} (${columns}) VALUES (${placeholders})`;

    return this.database.query(query, values);
  }
}

module.exports = AbstractManager;
