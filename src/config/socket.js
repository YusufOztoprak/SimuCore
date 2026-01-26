const { Server } = require("socket.io");

let io;

function initSocket(httpServer) {
    io = new Server(httpServer);

    io.on("connection", (socket) => {
        console.log("🔌 New client connected:", socket.id);

        socket.on("disconnect", () => {
            console.log("❌ Client disconnected:", socket.id);
        });
    });

    return io;
}

function getIO() {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
}

module.exports = { initSocket, getIO };