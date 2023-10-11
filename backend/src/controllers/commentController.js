const models = require("../models");

const postComment = (req, res) => {
  const { UserId, DemandId, Comment } = req.body;
  const parsedUserId = parseInt(UserId, 10);
  const parsedDemandId = parseInt(DemandId, 10);

  models.commentary
    .addComment(parsedUserId, parsedDemandId, Comment)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error saving");
    });
};

const updateComment = (req, res) => {
  const { Comment, DemandId, UserId } = req.body;

  models.commentary
    .modifComment({
      Comment,
      DemandId,
      UserId,
    })
    .then((commentary) => {
      res.status(201).json(commentary);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error saving");
    });
};

const getCommentsByDemandId = (req, res) => {
  const DemandId = parseInt(req.params.demandId, 10);

  models.commentary
    .findCommentsByDemandId(DemandId)
    .then(([rows]) => {
      res.json(rows);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error retrieving comments");
    });
};

module.exports = {
  postComment,
  updateComment,
  getCommentsByDemandId,
};
