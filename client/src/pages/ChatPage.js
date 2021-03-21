import { useState, useEffect } from "react";
import UsernameDialog from "../components/UsernameDialog";
import ChatView from "../components/ChatView";

const ChatPage = ({ classes, socket }) => {
    const [open, setOpen] = useState(true);
    const [username, setUsername] = useState("");
    const [usernameMessage, setUsernameMessage] = useState("What username do you want to use?");
    const [chat, setChat] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        socket.on("message", ({ message, username }) => {
            if (message && username)
                setChat(chat + username + ": " + message + "\n");
        });
    });

    const handleClose = (e) => {
        if (e.keyCode) {
            if (e.keyCode === 13) {
                checkAndSetUsername();
            }
        } else {
            checkAndSetUsername();
        }
    }

    const checkAndSetUsername = () => {
        if (username) {
            if (username.length > 20) {
                setUsernameMessage("Usernames can have a maximum of 20 characters!");
            } else {
                setOpen(false);
            }
        } else {
            setUsernameMessage("Please enter a username!");
        }
    }

    const handleMessage = (e) => {
        if (username) {
            if (e.target.value !== "" || e.target.value !== null) {
                if (e.keyCode === 13) {
                    socket.emit("message", { message, username });
                    setMessage("");
                }
            }
        }
    }

    const handleChange = (e) => {
        setUsername(e.target.value);
    }

    return (
        <div className="ChatPage">
            <UsernameDialog
                handleClose={handleClose}
                open={open}
                usernameMessage={usernameMessage}
                username={username}
                handleChange={handleChange}
            />

            <ChatView
                classes={classes}
                chat={chat}
                message={message}
                setMessage={setMessage}
                handleMessage={handleMessage}
            />
        </div>
    );
}

export default ChatPage;