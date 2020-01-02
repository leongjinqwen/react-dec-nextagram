import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import UserImages from "../containers/UserImages";
import { Link } from "react-router-dom";
import { Container } from "reactstrap"
// import { StoreContext } from "../hooks/TestStore";

const HomePage = props=>{
  // const {state, dispatch} = useContext(StoreContext)
  // console.log(state)

  const useStyles = makeStyles(theme => ({
    card: {
      maxWidth: 500,
      marginLeft:'auto',
      marginRight:'auto',
      marginTop:10,
      marginBottom:10,
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));
  
  const classes = useStyles();
    
  return(
    <Container>
      {props.users.map((user) => (
        <Card key={user.id} className={classes.card}>
          <Link to={`/users/${user.id}`}>
            <CardHeader
              avatar={<Avatar aria-label="recipe" alt="profile" src={user.profileImage} />}
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={user.username}
            />
            <div>
              <UserImages page="homepage" id={user.id} />
            </div> 
            <CardActions disableSpacing>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Link>
        </Card>
      ))}
    </Container>
  )
}
export default HomePage;