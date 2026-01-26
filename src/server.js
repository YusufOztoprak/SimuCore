const app = require("./app");
const sequelize = require("./config/database");

// Modelleri ve ilişkileri yükle (Sync öncesi şart!)
require('./modules/index');

const PORT = 3000;

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log("✅ Database connected");

        // alter: true -> Tablo yapısı değişirse veriyi silmeden günceller
        await sequelize.sync({ alter: true });
        console.log("✅ Database synced");

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Database error:", error);
    }
}

startServer();
