const path = require("path");
const fs = require("fs");

const options = {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem")
};

const express = require("express");

const PORT = process.env.PORT || 8000;
const app = express();
const httpsServer = require("https").createServer(options, app);

const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

let io;
if (process.env.NODE_ENV === "production") {
    io = require("socket.io")(httpsServer);

    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
} else if (process.env.NODE_ENV === "development") {
    io = require("socket.io")(httpsServer, {
        cors: {
            origin: "http://localhost:3000",
        }
    });
}

app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

io.on("connection", socket => {
    socket.on("message", ({ message, username }) => {
        io.sockets.emit("message", { message, username });
    });
});

app.use("/api", authRoutes);

httpsServer.listen(PORT, () => {
    console.log("Listening on port " + PORT + "!");
});