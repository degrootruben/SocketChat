const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 8000;
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
// const io = require("socket.io")(httpServer, { FOR DEV
//     cors: {
//         origin: process.env.CLIENT_ADDRESS,
//     }
// });

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