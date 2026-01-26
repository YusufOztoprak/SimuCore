const Simulation = require('./simulation/simulation.model');
const SimulationResult = require('./simulation/simulation-result.model');
const Species = require('./species/species.model');

// Define Associations
Simulation.hasMany(SimulationResult, { foreignKey: 'simulationId' });
SimulationResult.belongsTo(Simulation, { foreignKey: 'simulationId' });

module.exports = {
    Simulation,
    SimulationResult,
    Species
};