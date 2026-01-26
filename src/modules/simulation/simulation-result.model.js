const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const SimulationResult = sequelize.define('SimulationResult', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    simulationId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    tick: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    populationData: {
        type: DataTypes.JSON,
        allowNull: false
    }
});

module.exports = SimulationResult;