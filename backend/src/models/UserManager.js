const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  getAllUser() {
    return this.findAll();
  }

  find(id) {
    return this.database.query(
      `select username from  ${this.table} where id = ?`,
      [id]
    );
  }

  findByUsernameWithHashedPassword(username) {
    return this.database.query(
      `select id, username, hashedPassword from  ${this.table} where username = ?`,
      [username]
    );
  }

  findAll() {
    return this.database.query(`select username from  ${this.table}`);
  }

  insert(user) {
    return this.database.query(
      `insert into ${this.table} (username, Lastname, Firstname, Email, hashedPassword) values (?, ?, ?, ?, ?)`,
      [
        user.username,
        user.Lastname,
        user.Firstname,
        user.Email,
        user.hashedPassword,
      ]
    );
  }
}

module.exports = UserManager;
