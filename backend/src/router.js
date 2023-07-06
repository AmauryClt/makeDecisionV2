const express = require("express");

const router = express.Router();

const demandControllers = require("./controllers/demandControllers");

router.get("/demand", demandControllers.getVote);

const userControllers = require("./controllers/userControllers");

router.get("/user", userControllers.getProfile);

module.exports = router;
