import { Paper, Grid } from "@material-ui/core";
import ChatField from "./ChatField";
import MessageField from "./MessageField";

const ChatView = ({paperClassName, chatFieldClassName, messageFieldClassName, chat, message, setMessage, handleMessage}) => {
    return (
        <Paper className={paperClassName}>
            <Grid item xs={12}>
                <ChatField className={chatFieldClassName} chat={chat} />
            </Grid>
            <Grid item xs={12}>
                <MessageField className={messageFieldClassName} message={message} setMessage={setMessage} handleMessage={handleMessage} />
            </Grid>
        </Paper>
    );
}

export default ChatView;