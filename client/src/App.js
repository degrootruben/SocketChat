import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import io from "socket.io-client";
import ChatPage from "./pages/ChatPage";
import Home from "./pages/Home";
import Login from "./pages/Login";

let endpoint;
if (process.env.NODE_ENV === "development") {
  endpoint = "https://localhost:8000/";
} else if (process.env.NODE_ENV === "production") {
  endpoint = "/";
}

const socket = io(endpoint, { rejectUnauthorized: false });

const useStyles = makeStyles((theme) => ({
  grid: {
    width: "100%",
    margin: "0px"
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: "center",
    width: "65%",
    marginTop: "10px"
  },
  chatField: {
    width: "100%",
  },
  messageField: {
    width: "100%",
    marginTop: theme.spacing(4)
  },
  link: {
    color: "white"
  }
}));

export default function App() {
  const classes = useStyles();

  const [authorized, setAuthorized] = useState("");

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home classes={classes} endpoint={endpoint}/>
          </Route>
          <Route exact path="/chat">
            <ChatPage classes={classes} socket={socket} endpoint={endpoint} authorized={authorized} setAuthorized={setAuthorized}/>
          </Route>
          <Route exact path="/login">
            <Login classes={classes} endpoint={endpoint} authorized={authorized} setAuthorized={setAuthorized}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}