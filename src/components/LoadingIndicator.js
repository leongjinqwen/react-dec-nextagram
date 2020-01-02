import React from "react"
import { makeStyles,withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const LoadingIndicator = ({color,size="100px"})=>{
    const useStyles = makeStyles(theme => ({
      root: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
      },
    }));
    const ColorLinearProgress = withStyles({
      colorPrimary: {
        background: 'linear-gradient(to right,rgb(252, 142, 252),rgb(245, 226, 229),rgb(243, 208, 144),rgb(245, 245, 177))',
      },
      barColorPrimary: {
        background: 'linear-gradient(to right, rgb(172, 1, 172),rgb(235, 28, 131),rgb(236, 126, 0),rgb(238, 238, 7))',
      },
    })(LinearProgress);
    const classes = useStyles();
    return (
          <div className={classes.root}>
            <ColorLinearProgress />
          </div>
    );
};
export default LoadingIndicator;