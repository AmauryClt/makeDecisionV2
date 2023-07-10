const express = require("express");

const router = express.Router();

const demandControllers = require("./controllers/demandControllers");

router.get("/demand", demandControllers.getDemand);
router.post("/demand", demandControllers.postDemand);
router.put("/demand/:id", demandControllers.updateDemand);

module.exports = router;
