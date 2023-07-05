const express = require("express");

const router = express.Router();

const demandControllers = require("./controllers/demandControllers");

router.get("/demand", demandControllers.getVote);
router.post("/postDemand", demandControllers.postDemand);

module.exports = router;
