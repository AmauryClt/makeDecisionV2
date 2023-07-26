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
  const { ServicesImpacts } = req.body;

  models.demand
    .add(req.body)
    .then(([result]) => {
      const tasks =
        ServicesImpacts?.map((ServiceId) =>
          models.demandService.add(result.insertId, ServiceId)
        ) ?? [];
      Promise.all(tasks).then(() => {
        res.sendStatus(201);
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving");
    });
};

const updateDemand = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { ServicesImpacts } = req.body;

  models.demand
    .update({ ...req.body, Id: id })
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else if (ServicesImpacts?.length > 0) {
        models.demandService
          .flush(id)
          .then(() => {
            const tasks = ServicesImpacts.map((ServiceId) =>
              models.demandService.add(id, ServiceId)
            );
            return Promise.all(tasks);
          })
          .then(() => {
            res.send(204);
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send("Error saving");
          });
      } else if (ServicesImpacts?.length === 0) {
        res.send(204);
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
