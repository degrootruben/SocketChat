import { useState, useEffect } from "react";
import UsernameDialog from "../components/UsernameDialog";
import ChatView from "../components/ChatView";

const ChatPage = ({ classes, socket, endpoint, authorized, setAuthorized }) => {
    const [open, setOpen] = useState(true);
    const [username, setUsername] = useState("");
    const [usernameMessage, setUsernameMessage] = useState("What username do you want to use?");
    const [chat, setChat] = useState("");
    const [message, setMessage] = useState("");
    

    useEffect(() => {
        fetch(endpoint + "api/login", {
            method: "GET",
            credentials: "include"
        }).then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error(data.error);
            } else {
                setAuthorized(data.loggedIn);
            }
        }).catch(error => console.error(error));

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

            { authorized && 
                <UsernameDialog
                    handleClose={handleClose}
                    open={open}
                    usernameMessage={usernameMessage}
                    username={username}
                    handleChange={handleChange}
                />

                &&

                <ChatView
                    classes={classes}
                    chat={chat}
                    message={message}
                    setMessage={setMessage}
                    handleMessage={handleMessage}
                />
            }
            { !authorized && <h1>Not authorized!</h1> }
        </div>
    );
}

export default ChatPage;