const express = require("express");

const router = express.Router();

const demandControllers = require("./controllers/demandControllers");

router.get("/demands", demandControllers.getDemand);
router.get("/demands/:id", demandControllers.getOneDemand);
router.post("/demands/create", demandControllers.postDemand);
router.put("/demands/update/:id", demandControllers.updateDemand);

const authControllers = require("./controllers/authControllers");

router.post("/login", authControllers.login);

const userControllers = require("./controllers/userControllers");

router.get("/user", userControllers.getProfile);

module.exports = router;
