let username;
let userID;

while (username == null || username == "") {
    username = window.prompt("Username");
}

const inputField = document.getElementById("input-field");
const chatWindow = document.getElementById("chat-window");

const socket = io();

inputField.addEventListener("keyup", event => {
    if (event.keyCode == 13) {
        socket.emit("sendMessage", { message: inputField.value, userID });
        inputField.value = "";
    }
});

socket.on("connect", () => {
    userID = socket.id;
    socket.emit("setUsername", username);
    chat(`\"${username}\" you have succesfully connected!`);
});

socket.on("displayMessage", data => {
    chat(data.message, data.username);
});

const chat = (message, sender = "Server") => {
    chatWindow.value += `[${sender}] ${message}\n`;
}


