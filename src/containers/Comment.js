import React, { useState,useEffect } from "react";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment'

const Comment = ({ imageId }) => {
    const useStyles = makeStyles(theme => ({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: "100%",
                padding:0,
            },
            width: '100%',
            maxWidth: 360,
            padding: 0,
            backgroundColor: theme.palette.background.paper,
        },
        inline: {
            display: 'inline',
        },
        small: {
            width: theme.spacing(4),
            height: theme.spacing(4),
        },
    }));
    const classes = useStyles();
    const [ comments,setComments ] = useState([])
    const [ submitted,setSubmitted ] = useState(false)
    const [ text,setText ] = useState("")
    const jwt = localStorage.getItem("token")
    const user = JSON.parse(localStorage.getItem("user"))
    useEffect(()=>{
        if (imageId){
            axios({
                method: 'GET',
                url: `https://insta.nextacademy.com/api/v1/images/${imageId}/comments`,
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            .then(result => {
                setComments(result.data)
            })
            .catch(error => {
                console.log('ERROR: ', error)
            })
          }
    },[imageId,jwt,submitted])
    const handleInput = (e) =>{
        setText(e.target.value)
    }
    const handleComment = (e) =>{
        e.preventDefault()
        axios({
            method: 'POST',
            url: `https://insta.nextacademy.com/api/v1/images/${imageId}/comments`,
            headers: {
                Authorization: `Bearer ${jwt}`
            },
            data : {
                content:text
            }
        })
        .then(result => {
            setText("")
            setSubmitted(true)
        })
        .catch(error => {
            console.log('ERROR: ', error)
        })
        setSubmitted(false)
    }
    const handleLiked = (commentId,liked) =>{
        const initialComments = [...comments]
        setComments(comments.map(comment=>{
            if (comment.id===commentId){
                return  {...comment,liked:!comment.liked}
            } else {
                return comment
            }
        }))
        axios({
            method: 'POST',
            url: `https://insta.nextacademy.com/api/v1/comments/${commentId}/toggle_like`,
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        .then(result => {
            console.log(result)
            setComments(comments.map(comment=>{
                if (comment.id===result.data.comment_id){
                    return  {...comment,liked:!comment.liked}
                } else {
                    return comment
                }
            }))
        })
        .catch(error => {
            console.log('ERROR: ', error)
            setComments(initialComments)
        })
    }
    return(
        <>
            <List className={classes.root}>
                {comments.map(comment=>(
                    <>
                    <Divider component="li" />
                    <ListItem key={comment.id} alignItems="flex-start" style={{padding:"4px 8px"}}>
                        <ListItemAvatar>
                            <Link to={`/users/${comment.posted_by.id}`}>
                                <Avatar className={classes.small} alt={comment.posted_by.email} src={comment.posted_by.profileImage} />
                            </Link>
                        </ListItemAvatar>
                        <ListItemText
                            primary={comment.content}
                            secondary={<small>{`- ${moment(comment.created_at).format("MMM Do, YYYY")}`}</small>}
                        />
                        <IconButton style={{outline:'none',padding:"8px"}} aria-label="add to like">
                            { comment.liked 
                                ? <ThumbUpIcon style={{color:"blue"}} onClick={()=>handleLiked(comment.id,comment.liked)} /> 
                                : <ThumbUpIcon onClick={()=>handleLiked(comment.id,comment.liked)} /> }
                        </IconButton>
                    </ListItem>
                    </>
                ))}
                <Divider  component="li" />
                <ListItem alignItems="flex-start" style={{padding:"4px 8px"}}>
                    <ListItemAvatar>
                        <Avatar className={classes.small} alt="currentUser" src={user.profile_picture} />
                    </ListItemAvatar>
                    <form onSubmit={handleComment}>
                        <TextField style={{margin:"8px 0 0 0"}} placeholder=" Write comment" variant="filled" value={text} onChange={handleInput} />
                        <input type="submit" className="d-none" />
                    </form>
                </ListItem>
            </List>  
        </>
    )
}
export default Comment;