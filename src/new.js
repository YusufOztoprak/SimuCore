const simulationService = require("./simulation.service");

exports.createSimulation = async (req, res) => {
    try {
        const simulation = await simulationService.createSimulation(req.body);
        res.status(201).json({
            success: true,
            message: "Simulation created successfully",
            data: simulation
        });
    } catch (error) {
        console.error("Create Error:", error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.startSimulation = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await simulationService.runSimulation(id);
        res.status(200).json({
            success: true,
            message: "Simulation started",
            data: result
        });
    } catch (error) {
        console.error("Start Error:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};