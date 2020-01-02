import React, { useState,useEffect } from "react";
import axios from "axios";
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import Badge from '@material-ui/core/Badge';

const Likes = ({ imageId }) => {
    const useStyles = makeStyles(theme => ({
        container:{
            marginLeft: theme.spacing(2),
        },
        small: {
          width: theme.spacing(4),
          height: theme.spacing(4),
        },
    }));
    const classes = useStyles();
    const [ likes,setLikes ] = useState([])
    const [ liked,setLiked ] = useState(false)
    const jwt = localStorage.getItem("token")
    const user = JSON.parse(localStorage.getItem("user"))
    
    useEffect(()=>{
        if (imageId){
            axios({
                method: 'GET',
                url: `https://insta.nextacademy.com/api/v2/images/${imageId}`,
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            .then(result => {
                setLiked(result.data.liked)
                setLikes(result.data.likes)
            })
            .catch(error => {
                console.log('ERROR: ', error)
            })
          }
    },[imageId,jwt])
    const handleLiked = () =>{
        const initialLiked = liked
        setLiked(!liked)
        axios({
            method: 'POST',
            url: `https://insta.nextacademy.com/api/v1/images/${imageId}/toggle_like`,
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        .then(result => {
            console.log(result)
            setLiked(result.data.liked)
            if (result.data.liked) {
                setLikes([
                    ...likes,
                    {   id:user.id,
                        profileImage:user.profile_picture}
                ])
            } else {
                setLikes(likes.filter(item=>item.id!==user.id))
            }
        })
        .catch(error => {
            console.log('ERROR: ', error)
            setLiked(initialLiked)
        })
    }
    return(
        <>
            <IconButton style={{outline:'none'}} aria-label="add to favorites">
                <Badge
                    overlap="circle"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    badgeContent={likes.length}
                >
                    { liked 
                    ? <FavoriteIcon style={{color:"#d31960"}} onClick={handleLiked} /> 
                    : <FavoriteIcon onClick={handleLiked} /> }
                </Badge>
            </IconButton>
            <AvatarGroup className={classes.container} >
                {likes.map(user=>(
                    <Link key={user.id} to={`/users/${user.id}`} style={{border:'none'}} >
                        <Avatar alt={user.username} src={user.profileImage} className={classes.small} />
                    </Link>
                ))}
            </AvatarGroup>
        </>
    )
}
export default Likes;