import { Link } from "react-router-dom";
import ContentWrapper from "../components/ContentWrapper";

const Home = ({ classes, endpoint }) => {
    const logout = () => {
        fetch(endpoint + "api/logout", {
            method: "GET",
            credentials: "include"
        }).then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
    }

    return (
        <ContentWrapper classes={classes}>
            <Link className={classes.link} to="/login">Login</Link>
            <span> </span>
            <a className={classes.link} onClick={logout}>Logout</a>
            <span> </span>
            <Link className={classes.link} to="/chat">Chat</Link>
            <span> </span>
        </ContentWrapper>
    );
}

export default Home;