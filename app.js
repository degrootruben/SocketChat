const express = require("express");

const PORT = process.env.PORT | 8000;
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "http://localhost:3000",
    }
});

if (process.env.NODE_ENV === "production") {
    
}

io.on("connection", socket => {  
    socket.on("message", ({ message, username }) => {
        io.sockets.emit("message", { message, username });
    });
});

httpServer.listen(PORT, () => {
    console.log("Listening on port " + PORT + "!");
});