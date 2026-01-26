const sequelize = require('../config/database');
const Species = require('../modules/species/species.model');

const rawAnimals = [
    // PREDATORS
    { name: "Lion", scientificName: "Panthera leo", type: "PREDATOR", weight: 190, color: "#C69C6D" },
    { name: "Cheetah", scientificName: "Acinonyx jubatus", type: "PREDATOR", weight: 45, color: "#F9D066" },
    { name: "Leopard", scientificName: "Panthera pardus", type: "PREDATOR", weight: 60, color: "#E8A346" },
    { name: "Spotted Hyena", scientificName: "Crocuta crocuta", type: "PREDATOR", weight: 65, color: "#8D7F73" },
    { name: "African Wild Dog", scientificName: "Lycaon pictus", type: "PREDATOR", weight: 25, color: "#5C4D42" },
    { name: "Nile Crocodile", scientificName: "Crocodylus niloticus", type: "PREDATOR", weight: 400, color: "#4A5D23" },

    // PREY
    { name: "African Bush Elephant", scientificName: "Loxodonta africana", type: "PREY", weight: 6000, color: "#7D8471" },
    { name: "Giraffe", scientificName: "Giraffa camelopardalis", type: "PREY", weight: 1200, color: "#E8B658" },
    { name: "Plains Zebra", scientificName: "Equus quagga", type: "PREY", weight: 290, color: "#F0F0F0" },
    { name: "Wildebeest", scientificName: "Connochaetes taurinus", type: "PREY", weight: 200, color: "#54514D" },
    { name: "Thomson’s Gazelle", scientificName: "Eudorcas thomsonii", type: "PREY", weight: 22, color: "#D19C6E" },
    { name: "Impala", scientificName: "Aepyceros melampus", type: "PREY", weight: 55, color: "#C48658" },
    { name: "Warthog", scientificName: "Phacochoerus africanus", type: "PREY", weight: 85, color: "#6B5649" },
    { name: "Meerkat", scientificName: "Suricata suricatta", type: "PREY", weight: 1, color: "#C9A77F" }
];

function calculateStats(type, weight) {
    let growthRate, deathRate, consumptionRate;
    if (type === 'PREDATOR') {
        growthRate = 0.2 * Math.pow(weight, -0.25);
        deathRate = 0.05 * Math.pow(weight, -0.1);
        consumptionRate = 0.5 * Math.pow(weight, 0.75);
    } else {
        growthRate = 0.4 * Math.pow(weight, -0.25);
        deathRate = 0.05 * Math.pow(weight, -0.1);
        consumptionRate = 0.8 * Math.pow(weight, 0.75);
    }
    return {
        growthRate: Math.max(0.01, Math.min(0.5, growthRate)),
        deathRate: Math.max(0.01, Math.min(0.1, deathRate)),
        consumptionRate: Math.max(0.1, consumptionRate / 50)
    };
}

async function seedSavanna() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        await Species.destroy({ where: {}, truncate: true });
        console.log("🧹 Old data cleared.");

        const speciesList = [];
        // Plants
        speciesList.push(
            { name: 'Savanna Grass', scientificName: 'Poaceae', interactionType: 'PLANT', growthRate: 0.8, carryingCapacity: 100000, color: '#4caf50' },
            { name: 'Acacia Tree', scientificName: 'Vachellia tortilis', interactionType: 'PLANT', growthRate: 0.15, carryingCapacity: 5000, color: '#2e7d32' },
            { name: 'Baobab Tree', scientificName: 'Adansonia', interactionType: 'PLANT', growthRate: 0.05, carryingCapacity: 1000, color: '#1b5e20' }
        );

        // Animals
        rawAnimals.forEach(animal => {
            const stats = calculateStats(animal.type, animal.weight);
            speciesList.push({
                name: animal.name,
                scientificName: animal.scientificName,
                interactionType: animal.type,
                growthRate: stats.growthRate,
                deathRate: stats.deathRate,
                consumptionRate: stats.consumptionRate,
                color: animal.color,
                averageWeight: animal.weight,
                description: `${animal.name} (${animal.scientificName}) is a ${animal.type.toLowerCase()} weighing approx ${animal.weight}kg.`
            });
        });

        await Species.bulkCreate(speciesList);
        console.log(`✅ ${speciesList.length} species added to the Savanna!`);
    } catch (error) {
        console.error("❌ Error:", error);
    } finally {
        process.exit();
    }
}

seedSavanna();
