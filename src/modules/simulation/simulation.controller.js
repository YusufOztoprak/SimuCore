const simulationService = require('./simulation.service');

async function createSimulation(req, res) {
    try {
        const simulation = await simulationService.createSimulation(req.body);

        res.status(201).json({
            success: true,
            data: simulation,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

async function startSimulation(req, res) {
    try {
        const { id } = req.params;
        const result = await simulationService.runSimulation(id);

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = {
    createSimulation,
    startSimulation,
};