const models = require("../models");

const postComment = (req, res) => {
  const { UserId, demandId, comment } = req.body;
  const parsedUserId = parseInt(UserId, 10);
  const parsedDemandId = parseInt(demandId, 10);

  models.interaction
    .addComment(parsedUserId, parsedDemandId, comment)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error saving");
    });
};

module.exports = {
  postComment,
};
