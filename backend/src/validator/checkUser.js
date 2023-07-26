const mysql = require("mysql2");

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const connection = mysql.createConnection(dbConfig);

function checkUserMiddleware(req, res, next) {
  const { username } = req.body;

  const query = "SELECT * FROM user WHERE username = ?";
  connection.query(query, [username], (error, results) => {
    if (error) {
      throw new Error(error);
    }

    if (results.length > 0) {
      return res
        .status(403)
        .json({ error: "Le nom d'utilisateur existe déjà" });
    }

    return next();
  });
}

module.exports = { checkUserMiddleware };
