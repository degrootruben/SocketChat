const express = require("express");

const PORT = process.env.PORT | 8000;
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "http://localhost:" + PORT,
    }
});

let usernames = [];

app.use(express.static("public", { root: __dirname }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).sendFile("./index.html");
});

io.on("connection", socket => {
    socket.on("setUsername", data => {
        usernames[socket.id] = data;
    });
        
    socket.on("sendMessage", data => {
        io.sockets.emit("displayMessage", { message: data.message, username: usernames[data.userID] });
    });
});

httpServer.listen(PORT, () => {
    console.log("Listening on port " + PORT + "!");
});