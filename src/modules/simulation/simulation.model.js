const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Simulation = sequelize.define(
    "Simulation",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        status: {
            type: DataTypes.ENUM("pending", "running", "completed", "failed"),
            allowNull: false,
            defaultValue: "pending",
        },

        currentTick: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },

        maxTick: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        parameters: {
            type: DataTypes.JSONB,
            allowNull: false,
        },

        result: {
            type: DataTypes.JSONB,
            allowNull: true,
        },
    },
    {
        tableName: "simulations",
        timestamps: true,
    }
);

module.exports = Simulation;