const mysql = require("mysql2");

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const connection = mysql.createConnection(dbConfig);

function checkDemandMiddleware(req, res, next) {
  const demandId = req.body.DemandId;

  const query = "SELECT statut FROM demand WHERE id = ?";
  connection.query(query, [demandId], (error, results) => {
    if (error) {
      throw new Error(error);
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Demande non trouvée" });
    }

    const { statut } = results[0];

    if (
      statut === "VALIDE" ||
      statut === "MISE EN PLACE" ||
      statut === "ARCHIVE" ||
      statut === "QUARANTAINE"
    ) {
      return res
        .status(403)
        .json({ error: "Impossible de modifier cette demande" });
    }

    return next();
  });
}

function checkStatutMiddleware(req, res, next) {
  const demandId = req.params.id;

  const query = "SELECT Statut FROM demand WHERE Id = ?";
  connection.query(query, [demandId], (error, results) => {
    if (error) {
      throw new Error(error);
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Demande non trouvée" });
    }

    const { Statut } = results[0];

    if (
      Statut === "VALIDE" ||
      Statut === "MISE EN PLACE" ||
      Statut === "ARCHIVE" ||
      Statut === "QUARANTAINE"
    ) {
      return res
        .status(403)
        .json({ error: "Impossible de modifier cette demande" });
    }

    return next();
  });
}

module.exports = {
  checkDemandMiddleware,
  checkStatutMiddleware,
};
