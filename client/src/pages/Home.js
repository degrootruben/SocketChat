import { Link } from "react-router-dom";
import ContentWrapper from "../components/ContentWrapper";

const Home = ({ classes }) => {
    return (
        <ContentWrapper classes={classes}>
            <Link className={classes.link} to="/login">Login</Link>
            <span> </span>
            <Link className={classes.link} to="/logout">Logout</Link>
            <span> </span>
            <Link className={classes.link} to="/chat">Chat</Link>
        </ContentWrapper>
    );
}

export default Home;