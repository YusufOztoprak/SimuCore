const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "../public")));

// Serve the dashboard on the root route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Serve the science page
app.get("/science", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/science.html"));
});

const simulationRoutes = require("./modules/simulation/simulation.routes");
app.use("/simulations", simulationRoutes);

module.exports = app;
