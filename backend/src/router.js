const express = require("express");

const router = express.Router();

const demandControllers = require("./controllers/demandControllers");
const interactionControllers = require("./controllers/interactionControllers");

router.get("/demands/", demandControllers.getDemand);
router.get("/demands/:id", demandControllers.getOneDemand);
router.post("/demands/create", demandControllers.postDemand);
router.put("/demands/update/:id", demandControllers.updateDemand);
router.post("/note", interactionControllers.postNote);
router.put("/note/:id", interactionControllers.updateNote);
router.get("/notes/:id", interactionControllers.getNotesByDemandId);
router.get(
  "/notesDemands/:demandId",
  interactionControllers.getUsersNotesByDemandId
);

const userControllers = require("./controllers/userControllers");

const { hashPassword, verifyPassword, logout } = require("./services/auth");

router.get("/user", userControllers.getProfile);
router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.put("/users/:id", hashPassword, userControllers.edit);
router.post("/users", hashPassword, userControllers.add);
router.post("/user", userControllers.postUser);
router.delete("/users/:id", userControllers.destroy);
router.get("/user/:userId", userControllers.getUserById);

const commentController = require("./controllers/commentController");

router.post("/comments", commentController.postComment);
router.get("/comments/:demandId", commentController.getCommentsByDemandId);

const authControllers = require("./controllers/authControllers");

router.post(
  "/login",
  authControllers.getUserByUsernameWithPasswordAndPassToNext,
  verifyPassword
);
router.get("logout", logout);

// router.use(verifyToken); // mur d'authentification
module.exports = router;
