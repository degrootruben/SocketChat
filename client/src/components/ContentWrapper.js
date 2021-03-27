import { Grid, Paper } from "@material-ui/core";

const ContentWrapper = ({ classes, children }) => {
    return ( 
        <div className="ContentWrapper">
            <Grid
                container
                spacing={2}
                className={classes.grid}
                align="center"
                justify="center"
            >
                <Paper className={classes.paper}>

                {children}
                
                </Paper>
            </Grid>
        </div>
     );
}
 
export default ContentWrapper;