const express = require("express");

const router = express.Router();

const demandControllers = require("./controllers/demandControllers");

router.get("/demand", demandControllers.getVote);
router.post("/postDemand", demandControllers.postDemand);

const authControllers = require("./controllers/authControllers");

router.post("/login", authControllers.login);

const userControllers = require("./controllers/userControllers");

router.get("/user", userControllers.getProfile);

module.exports = router;
