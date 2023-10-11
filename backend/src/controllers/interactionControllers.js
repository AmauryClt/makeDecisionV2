const models = require("../models");

const postNote = (req, res) => {
  const { Note, UserId, DemandId } = req.body;
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
    .modifInteraction(Note, UserId, DemandId)
    .then((interaction) => {
      res.status(201).json(interaction);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error saving");
    });
};

const getNotesByDemandId = (req, res) => {
  const { id } = req.params;
  const parsedId = parseInt(id, 10);

  models.interaction
    .findNoteByDemandId(parsedId)
    .then((notes) => {
      res.status(200).json({ notes });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error retrieving notes");
    });
};

const getUsersNotesByDemandId = (req, res) => {
  const DemandId = parseInt(req.params.demandId, 10);

  models.interaction
    .findUserByDemandId(DemandId)
    .then(([rows]) => {
      res.json(rows);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error retrieving user");
    });
};

module.exports = {
  postNote,
  updateNote,
  getNotesByDemandId,
  getUsersNotesByDemandId,
};
