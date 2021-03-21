import { useState } from "react";
import { TextField, Grid } from "@material-ui/core"
import ContentWrapper from "../components/ContentWrapper";

const Login = ({ classes, ENDPOINT }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if(username && password) {
            fetch(ENDPOINT + "api/login", {
                method: "POST",
                body: {
                    username,
                    password
                }
            }).then(response => response.json())
            .then(data => {
                
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
                </form>
            </ContentWrapper>
        </div>
    );
}

export default Login;