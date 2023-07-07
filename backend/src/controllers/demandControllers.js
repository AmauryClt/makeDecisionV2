const models = require("../models");

const getVote = (req, res) => {
  models.demand
    .findAll()
    .then(([rows]) => {
      res.json(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const postDemand = (req, res) => {
  const { servicesIds, ...rest } = req.body
  models.demand
    .add(req.body)
    .then(([result]) => {
      servicesIds.forEach(ServiceId => {
        models.demandService.add(result.insertId, ServiceId);
      })
      res.location(`/demand/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving");
    });
};

module.exports = {
  getVote,
  postDemand,
};
