const Simulation = require("./simulation.model");
const SimulationEngine = require("./simulation.engine");

async function createSimulation({ name, maxTick, parameters }) {
    if (!name || !maxTick || !parameters) {
        throw new Error("No parameters provided");
    }

    const simulation = await Simulation.create({
        name,
        maxTick,
        parameters,
    });

    return simulation;
}

async function runSimulation(simulationId) {
    const engine = new SimulationEngine(simulationId);
    // Run asynchronously without awaiting to avoid blocking the response
    engine.run().catch(err => console.error("Background simulation error:", err));
    return { message: "Simulation started", simulationId };
}

module.exports = {
    createSimulation,
    runSimulation,
};