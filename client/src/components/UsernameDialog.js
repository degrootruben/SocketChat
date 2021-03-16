import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@material-ui/core";

const UsernameDialog = ({ handleClose, open, usernameMessage, username, handleChange }) => {
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" disableBackdropClick={true}>
            <DialogTitle id="form-dialog-title">{usernameMessage}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Username"
                    value={username}
                    onChange={handleChange}
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
    );
}

export default UsernameDialog;