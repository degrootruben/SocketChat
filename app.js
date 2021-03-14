const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 8000;
const app = express();
const httpServer = require("http").createServer(app);

let io;

if (process.env.NODE_ENV === "production") {
    io = require("socket.io")(httpServer);
} else {
    io = require("socket.io")(httpServer, {
        cors: {
            origin: "http://localhost:3000",
        }
    });
}

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

io.on("connection", socket => {
    socket.on("message", ({ message, username }) => {
        io.sockets.emit("message", { message, username });
    });
});

httpServer.listen(PORT, () => {
    console.log("Listening on port " + PORT + "!");
});