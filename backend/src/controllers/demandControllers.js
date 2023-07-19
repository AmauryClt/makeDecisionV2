const models = require("../models");

const getDemand = (req, res) => {
  models.demand
    .findAllWithUser()

    .then(([rows]) => {
      res.json(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getOneDemand = (req, res) => {
  models.demand
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const postDemand = (req, res) => {
  const { ServicesIds, userId } = req.body;

  models.demand
    .add({ ...req.body, userId })
    .then(([result]) => {
      if (ServicesIds && Array.isArray(ServicesIds)) {
        ServicesIds.forEach((ServiceId) => {
          models.demandService.add(result.insertId, ServiceId);
        });
      }
      res.location(`/demands/${result.insertId}`);
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
      } else if (Array.isArray(ServicesIds) && ServicesIds !== []) {
        models.demandService.flush(id).then(() => {
          ServicesIds.forEach((ServiceId) => {
            models.demandService.add(id, ServiceId);
            res.location(`/demands/${id}`);
          });
        });
      } else {
        res.location(`/demands/${id}`);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving");
    });
};

const putNote = (req, res) => {
  const Id = parseInt(req.params.id, 10);
  const { Note } = req.body;
  models.demand
    .put({ Note, Id })
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the note");
    });
};

module.exports = {
  getDemand,
  getOneDemand,
  postDemand,
  updateDemand,
  putNote,
};
