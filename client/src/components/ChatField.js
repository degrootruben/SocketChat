import { TextField } from "@material-ui/core";

const ChatField = ({ className, chat }) => {
    return (
        <TextField
            className={className}
            id="outlined-multiline-static"
            multiline
            rows={25}
            variant="outlined"
            InputProps={{ readOnly: true }}
            value={chat}
        />
    );
}

export default ChatField;