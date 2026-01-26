const Simulation = require("./simulation.model");
const SimulationResult = require("./simulation-result.model");
const Species = require("../species/species.model");
const EcosystemRules = require("../ecosystem/ecosystem.rules");
const { getIO } = require("../../config/socket");

class SimulationEngine {
    constructor(simulationId) {
        this.simulationId = simulationId;
        this.simulation = null;
        this.currentState = {};
        this.speciesList = [];
    }

    async init() {
        this.simulation = await Simulation.findByPk(this.simulationId);
        if (!this.simulation) throw new Error("Simulation not found");

        // Fetch ALL species from DB
        this.speciesList = await Species.findAll({ raw: true });

        const lastResult = await SimulationResult.findOne({
            where: { simulationId: this.simulationId },
            order: [['tick', 'DESC']]
        });

        if (lastResult) {
            this.currentState = lastResult.populationData;
            this.simulation.currentTick = lastResult.tick;
        } else {
            this.currentState = { ...this.simulation.initialState };
            await this.saveResult(0, this.currentState);
        }

        console.log(`🏁 Engine initialized for: ${this.simulation.name}`);
    }

    async run() {
        if (!this.simulation) await this.init();
        this.simulation.status = "running";
        await this.simulation.save();

        while (this.simulation.currentTick < this.simulation.maxTick) {
            await this.tick();
        }

        this.simulation.status = "completed";
        await this.simulation.save();
    }

    async tick() {
        this.simulation.currentTick++;
        const currentTick = this.simulation.currentTick;

        // Calculate next state
        const nextState = EcosystemRules.calculateNextState(
            this.currentState,
            this.speciesList,
            this.simulation.parameters || {}
        );

        this.currentState = nextState;
        await this.saveResult(currentTick, this.currentState);

        try {
            getIO().emit('simulation-update', {
                simulationId: this.simulationId,
                tick: currentTick,
                data: this.currentState
            });
        } catch (e) { /* ignore socket errors */ }

        if (currentTick % 10 === 0) await this.simulation.save();

        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    async saveResult(tick, data) {
        await SimulationResult.create({
            simulationId: this.simulationId,
            tick: tick,
            populationData: data
        });
    }
}

module.exports = SimulationEngine;