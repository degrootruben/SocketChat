import { TextField } from "@material-ui/core";

const MessageField = ({ className, message, setMessage, handleMessage }) => {
    return ( 
        <TextField className={className} label="Message" value={message} onChange={(e) => setMessage(e.target.value)} variant="outlined" onKeyDown={handleMessage} />
     );
}
 
export default MessageField;