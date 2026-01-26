const Simulation = require("./simulation.model");
const SimulationEngine = require("./simulation.engine");

/**
 * Creates a new simulation record in the database.
 * @param {object} simulationData
 * @returns {Promise<Simulation>}
 */
async function createSimulation({ name, maxTick, parameters, initialState }) {
    if (!name || !maxTick || !parameters || !initialState) {
        throw new Error(
            "Missing required simulation parameters: name, maxTick, parameters, or initialState."
        );
    }

    const simulation = await Simulation.create({
        name,
        maxTick,
        parameters,
        initialState,
    });

    return simulation;
}

/**
 * Starts a simulation asynchronously.
 * @param {string} simulationId
 * @returns {Promise<{message: string, simulationId: string}>}
 */
async function runSimulation(simulationId) {
    // Initialize the engine
    const engine = new SimulationEngine(simulationId);

    // Run asynchronously without awaiting to avoid blocking the HTTP response
    engine.run().catch(err => console.error(`[Engine Error] Simulation ${simulationId}:`, err));

    return { message: "Simulation started in the background.", simulationId };
}

module.exports = {
    createSimulation,
    runSimulation,
};