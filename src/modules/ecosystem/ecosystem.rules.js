/**
 * Ecosystem Rules Service
 * Scientific population dynamics using discrete time steps.
 */
class EcosystemRules {

    calculateNextState(currentState, speciesList, parameters) {
        const nextState = { ...currentState };
        const dt = 1.0;

        // 1. Group Species by Role
        const plants = speciesList.filter(s => s.interactionType === 'PLANT');
        const prey = speciesList.filter(s => s.interactionType === 'PREY');
        const predators = speciesList.filter(s => s.interactionType === 'PREDATOR');

        // 2. PLANT DYNAMICS (Logistic Growth)
        let totalGrazingPressure = 0;
        prey.forEach(h => {
            const pop = currentState[h.name] || 0;
            totalGrazingPressure += pop * (h.consumptionRate || 0.5);
        });

        plants.forEach(plant => {
            const P = currentState[plant.name] || 0;
            const r = plant.growthRate;
            const K = plant.carryingCapacity || 10000;

            // Distribute grazing pressure among plant species
            const grazingOnThis = plants.length > 0 ? totalGrazingPressure / plants.length : 0;

            // dP/dt = rP(1 - P/K) - Grazing
            const growth = r * P * (1 - (P / K));
            const change = (growth - grazingOnThis) * dt;

            nextState[plant.name] = Math.max(0, P + change);
        });

        // 3. HERBIVORE DYNAMICS (Lotka-Volterra Prey)
        let totalPlantBiomass = 0;
        plants.forEach(p => totalPlantBiomass += (nextState[p.name] || 0));

        let totalPredationPressure = 0;
        predators.forEach(p => {
            const pop = currentState[p.name] || 0;
            totalPredationPressure += pop * (p.consumptionRate || 1.0);
        });

        prey.forEach(herbivore => {
            const H = currentState[herbivore.name] || 0;
            const foodNeeded = H * (herbivore.consumptionRate || 0.5);

            // Food Limitation Factor: If plants are scarce, growth stops
            const foodFactor = totalPlantBiomass > 0 ? Math.min(1, totalPlantBiomass / (foodNeeded + 1)) : 0;

            // Predation pressure distributed among prey
            const predationOnThis = prey.length > 0 ? totalPredationPressure / prey.length : 0;

            const births = H * herbivore.growthRate * foodFactor;
            const deaths = H * herbivore.deathRate;

            const change = (births - deaths - predationOnThis) * dt;
            nextState[herbivore.name] = Math.max(0, H + change);
        });

        // 4. CARNIVORE DYNAMICS (Lotka-Volterra Predator)
        let totalPreyBiomass = 0;
        prey.forEach(p => totalPreyBiomass += (nextState[p.name] || 0));

        predators.forEach(carnivore => {
            const C = currentState[carnivore.name] || 0;
            const foodNeeded = C * (carnivore.consumptionRate || 1.0);

            // Hunting Success based on prey availability
            const huntingSuccess = totalPreyBiomass > 0 ? Math.min(1, totalPreyBiomass / (foodNeeded + 1)) : 0;

            const births = C * carnivore.growthRate * huntingSuccess;
            const deaths = C * carnivore.deathRate;

            const change = (births - deaths) * dt;
            nextState[carnivore.name] = Math.max(0, C + change);
        });

        // Round to integers
        Object.keys(nextState).forEach(key => {
            nextState[key] = Math.round(nextState[key]);
        });

        return nextState;
    }
}

module.exports = new EcosystemRules();