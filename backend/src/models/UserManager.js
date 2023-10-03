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
      `SELECT username from  ${this.table} where id = ?`,
      [id]
    );
  }

  findByUsernameWithHashedPassword(username) {
    return this.database.query(
      `SELECT Id, Email, username, Lastname, Firstname, Numeromob, Numerofix, Admin, hashedPassword from  ${this.table} where username = ?`,
      [username]
    );
  }

  findById(id) {
    return this.database.query(
      `SELECT Id, Email, username, Lastname, Firstname, Numeromob, Numerofix, Admin FROM ${this.table} WHERE Id = ?`,
      [id]
    );
  }

  findAllUser() {
    return this.database.query(
      `SELECT Id, username, Firstname, Lastname, Numeromob, Numerofix, Admin FROM  ${this.table}`
    );
  }

  insert(user) {
    return this.database.query(
      `INSERT into ${this.table} (username, Lastname, Firstname, Numeromob, Email, hashedPassword) values (?, ?, ?, ?, ?, ?)`,
      [
        user.username,
        user.Lastname,
        user.Firstname,
        user.Numeromob,
        user.Email,
        user.hashedPassword,
      ]
    );
  }

  change(user) {
    return this.database.query(
      `UPDATE ${this.table} SET username = ?, Lastname = ?, Firstname = ?, Numeromob = ?, Email = ? WHERE Id=?`,
      [
        user.username,
        user.Lastname,
        user.Firstname,
        user.Numeromob,
        user.Email,
        user.Id,
      ]
    );
  }
}

module.exports = UserManager;
