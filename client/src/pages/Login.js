import { useState } from "react";
import { TextField, Grid, Button } from "@material-ui/core"
import { useHistory } from "react-router-dom";
import ContentWrapper from "../components/ContentWrapper";

const Login = ({ classes, endpoint }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username && password) {
            const data = JSON.stringify({ username, password });
            fetch(endpoint + "api/login", {
                method: "POST",
                mode: 'cors',
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: data
            }).then(response => response.json())
                .then(data => {
                    if (data.error) {
                        console.error(data.error);
                    } else {
                        history.push("/chat");
                    }
                    console.log(data);
                })
                .catch(error => console.error(error));
        }
    }

    return (
        <div className="login">
            <ContentWrapper classes={classes}>
                <form onSubmit={handleSubmit}>
                    <Grid item xs={12}>
                        <TextField placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ marginTop: "20px" }} />
                    </Grid>
                    <Button onSubmit={handleSubmit} onClick={handleSubmit}>Login</Button>
                </form>
            </ContentWrapper>
        </div>
    );
}

export default Login;