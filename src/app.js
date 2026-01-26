const express = require("express");
const app = express();

app.use(express.json());

// Basit kontrol rotası (Tarayıcıdan test etmek için)
app.get("/", (req, res) => {
    res.send("SimuCore API is running 🚀");
});

const simulationRoutes = require("./modules/simulation/simulation.routes");
app.use("/simulations", simulationRoutes);

module.exports = app;