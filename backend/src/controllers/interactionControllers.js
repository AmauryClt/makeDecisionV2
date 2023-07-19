const models = require("../models");

const postNote = (req, res) => {
  const { Note, UserId, DemandId } = req.body;
  console.info(req.body);
  models.interaction
    .addInteraction({
      DemandId,
      UserId,
      Note,
    })
    .then((interaction) => {
      res.status(201).json(interaction);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error saving");
    });
};

const updateNote = (req, res) => {
  const { Note, UserId, DemandId } = req.body;
  models.interaction
    .modifInteraction({
      DemandId,
      UserId,
      Note,
    })
    .then((interaction) => {
      res.status(201).json(interaction);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error saving");
    });
};

const getNoteByDemandId = (req, res) => {
  const { UserId, DemandId, Note } = req.body;
  const parsedUserId = parseInt(UserId, 10);
  const parsedDemandId = parseInt(DemandId, 10);

  models.interaction
    .findNoteByDemandId(parsedUserId, parsedDemandId, Note)
    .then(([interaction]) => {
      res.status(201).json(interaction);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error retrieving comments");
    });
};

module.exports = {
  postNote,
  updateNote,
  getNoteByDemandId,
};
