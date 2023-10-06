const express = require("express");

const router = express.Router();

const demandControllers = require("./controllers/demandControllers");
const interactionControllers = require("./controllers/interactionControllers");
const commentController = require("./controllers/commentController");
const { checkDemandMiddleware } = require("./validator/checkDemand");

router.get("/demands/", demandControllers.getDemand);
router.get("/demands/:id", demandControllers.getOneDemand);
router.post(
  "/demands/create",
  checkDemandMiddleware,
  demandControllers.postDemand
);
router.put(
  "/demands/update/:id",
  checkDemandMiddleware,
  demandControllers.updateDemand
);
router.post("/comments", checkDemandMiddleware, commentController.postComment);
router.get("/comments/:demandId", commentController.getCommentsByDemandId);
router.post("/note", checkDemandMiddleware, interactionControllers.postNote);
router.put(
  "/note/:id",
  checkDemandMiddleware,
  interactionControllers.updateNote
);
router.get("/notes/:id", interactionControllers.getNotesByDemandId);
router.get(
  "/notesDemands/:demandId",
  interactionControllers.getUsersNotesByDemandId
);

const userControllers = require("./controllers/userControllers");

const { hashPassword, verifyPassword, logout } = require("./services/auth");
const { checkUserMiddleware } = require("./validator/checkUser");

router.get("/user", userControllers.getProfile);
router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.put("/users/:id", hashPassword, userControllers.edit);
router.put("/changeUser/:id", checkUserMiddleware, userControllers.changeUser);
router.post("/users", checkUserMiddleware, hashPassword, userControllers.add);
router.delete("/users/:id", userControllers.destroy);
router.get("/user/:userId", userControllers.getUserById);

const authControllers = require("./controllers/authControllers");

router.post(
  "/login",
  authControllers.getUserByUsernameWithPasswordAndPassToNext,
  verifyPassword
);
router.get("logout", logout);

// router.use(verifyToken); // mur d'authentification
module.exports = router;
