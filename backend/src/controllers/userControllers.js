const models = require("../models");

const getProfile = (req, res) => {
  models.user
    .findAll()
    .then(([rows]) => {
      res.json(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getProfile,
};
