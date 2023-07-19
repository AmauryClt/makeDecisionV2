const express = require("express");

const router = express.Router();

const demandControllers = require("./controllers/demandControllers");

router.get("/demands/", demandControllers.getDemand);
router.get("/demands/:id", demandControllers.getOneDemand);
router.post("/demands/create", demandControllers.postDemand);
router.put("/demands/update/:id", demandControllers.updateDemand);

const userControllers = require("./controllers/userControllers");

const {
  hashPassword,
  verifyPassword,
  verifyToken,
} = require("./services/auth");

router.get("/user", userControllers.getProfile);
router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.put("/users/:id", hashPassword, userControllers.edit);
router.post("/users", hashPassword, userControllers.add);
router.delete("/users/:id", userControllers.destroy);
router.get("/user/:userId", userControllers.getUserById);

const authControllers = require("./controllers/authControllers");

router.post(
  "/login",
  authControllers.getUserByUsernameWithPasswordAndPassToNext,
  verifyPassword
);

router.use(verifyToken); // mur d'authentification
module.exports = router;
