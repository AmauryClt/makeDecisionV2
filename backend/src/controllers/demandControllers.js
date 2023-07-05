const models = require("../models");

const getVote = (req, res) => {
  models.boat
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
  getVote,
};
