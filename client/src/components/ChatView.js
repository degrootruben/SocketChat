import { Grid } from "@material-ui/core";
import ChatField from "./ChatField";
import ContentWrapper from "./ContentWrapper";
import MessageField from "./MessageField";

const ChatView = ({classes, chat, message, setMessage, handleMessage}) => {
    return (
        <ContentWrapper classes={classes}>
            <Grid item xs={12}>
                <ChatField className={classes.chatField} chat={chat} />
            </Grid>
            <Grid item xs={12}>
                <MessageField className={classes.messageField} message={message} setMessage={setMessage} handleMessage={handleMessage} />
            </Grid>
        </ContentWrapper>
    );
}

export default ChatView;