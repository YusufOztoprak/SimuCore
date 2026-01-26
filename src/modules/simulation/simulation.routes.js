const express = require("express");
const router = express.Router();
const simulationController = require("./simulation.controller");

router.post("/", simulationController.createSimulation);
router.post("/:id/start", simulationController.startSimulation);

module.exports = router;