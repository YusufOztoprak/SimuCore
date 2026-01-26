const http = require('http');
const app = require("./app");
const sequelize = require("./config/database");
const { initSocket } = require('./config/socket');

// Load models and associations (Required before Sync!)
require('./modules/index');

const PORT = 3000;

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log("✅ Database connected");

        // alter: true -> Updates tables without deletion (Prevents data loss)
        await sequelize.sync({ alter: true });
        console.log("✅ Database synced");

        // Create HTTP server and attach Socket.io
        const server = http.createServer(app);
        initSocket(server);

        server.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Database error:", error);
    }
}

startServer();
