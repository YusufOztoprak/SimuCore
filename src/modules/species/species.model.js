const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Species = sequelize.define('Species', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    scientificName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    // --- Biological Role ---
    interactionType: {
        type: DataTypes.ENUM('PLANT', 'PREY', 'PREDATOR'),
        allowNull: false
    },
    // --- Statistics ---
    growthRate: {
        type: DataTypes.FLOAT,
        defaultValue: 0.1
    },
    deathRate: {
        type: DataTypes.FLOAT,
        defaultValue: 0.05
    },
    consumptionRate: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    carryingCapacity: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    // --- Visuals ---
    color: {
        type: DataTypes.STRING,
        defaultValue: '#ffffff'
    },
    // --- Scientific Data ---
    averageWeight: { // in kg
        type: DataTypes.FLOAT,
        allowNull: true
    }
}, {
    timestamps: true
});

module.exports = Species;