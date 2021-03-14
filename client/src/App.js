import React from "react";
import { useState, useEffect } from "react";
import { Grid, Paper, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import io from "socket.io-client";

const socket = io.connect("http://localhost:8000");

const useStyles = makeStyles((theme) => ({
  grid: {
    width: "100%",
    margin: "0px"
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: "center",
    width: "65%",
    marginTop: "5%"
  },
  chatField: {
    width: "100%",
  },
  messageField: {
    width: "100%",
    marginTop: theme.spacing(4)
  }
}));

export default function App() {
  const classes = useStyles();
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
        if (username) {
          setOpen(!open);
        } else {
          setUsernameMessage("Please enter a username!");
        }
      }
    } else {
      if (username) {
        setOpen(!open);
      } else {
        setUsernameMessage("Please enter a username!");
      }
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

  return (
    <div className="App">
      {/* Username dialog */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" disableBackdropClick={true}>
        <DialogTitle id="form-dialog-title">{usernameMessage}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            fullWidth
            onKeyDown={handleClose}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Chat view */}
      <Grid
        container
        spacing={2}
        className={classes.grid}
        align="center"
        justify="center"
      >
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid item xs={12}>
              <TextField
                className={classes.chatField}
                id="outlined-multiline-static"
                multiline
                rows={25}
                variant="outlined"
                InputProps={{ readOnly: true }}
                value={chat}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField className={classes.messageField} label="Message" value={message} onChange={(e) => setMessage(e.target.value)} variant="outlined" onKeyDown={handleMessage} />
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>);
}