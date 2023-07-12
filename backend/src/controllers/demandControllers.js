const models = require("../models");

const getDemand = (req, res) => {
  models.demand
    .findAll("user")
    .then(([rows]) => {
      res.json(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const postDemand = (req, res) => {
  const { ServicesIds } = req.body;
  models.demand
    .add(req.body)
    .then(([result]) => {
      if (ServicesIds && Array.isArray(ServicesIds)) {
        ServicesIds.forEach((ServiceId) => {
          models.demandService.add(result.insertId, ServiceId);
        });
      }
      res.location(`/demand/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving");
    });
};

const updateDemand = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { ServicesIds } = req.body;
  console.info(req.body);
  models.demand
    .update({ ...req.body, Id: id })
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        if (ServicesIds && Array.isArray(ServicesIds)) {
          models.demandService.flush(id);
          ServicesIds.forEach((ServiceId) => {
            models.demandService.add(id, ServiceId);
          });
        }
        res.location(`/demand/${id}`).sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving");
    });
};

module.exports = {
  getDemand,
  postDemand,
  updateDemand,
};
