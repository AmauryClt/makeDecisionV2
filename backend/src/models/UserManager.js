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
      `select Id, Email, username, Lastname, Firstname, Numeromob, Adresse, Numerofix, Admin, hashedPassword from  ${this.table} where username = ?`,
      [username]
    );
  }

  findById(id) {
    return this.database.query(
      `SELECT Id, Email, username, Lastname, Firstname, Numeromob, Adresse, Numerofix, Admin FROM ${this.table} WHERE Id = ?`,
      [id]
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

  add(user) {
    return this.database.query(
      `insert into ${this.table}(Email,username,Lastname,Firstname,Numeromob,ServiceImpact,hashedPassword)values (?,?,?,?,?,?,?)`,
      [
        user.Email,
        user.username,
        user.Lastname,
        user.Firstname,
        user.Numeromob,
        user.ServiceImpact,
        user.hashedPassword,
      ]
    );
  }

  addUser(user) {
    return this.add(user);
  }
}

module.exports = UserManager;
