import React, {useState,useEffect} from "react"
import axios from "axios"
import {useParams} from "react-router-dom"
import LoadingIndicator from "../components/LoadingIndicator"
import UserImages from "../containers/UserImages"
import Image from "react-graceful-image";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const UserProfilePage = ({currentUser}) => {
    const {id} = useParams()
    const [user,setUser] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const image = {
        borderRadius: "50%",
    }
    const useStyles = makeStyles(theme => ({
        root: {
          flexGrow: 1,
        },
    }));
    const classes = useStyles();
    useEffect(()=>{
        axios.get(`https://insta.nextacademy.com/api/v1/users/${id}`)
        .then(result => {
            setIsLoading(false)
            setUser(result.data)
        })
        .catch(error => {
            console.log('ERROR: ', error)
        })
    },[id])
    return (
        <>
        {
            isLoading ? <LoadingIndicator /> :
            <Grid container spacing={3} className={classes.root}>
                <Grid item xs={12} className="text-center p-5">
                    <Image src={user.profileImage} width="200px" style={image} alt={user.username}/>
                    <h3>@{user.username}</h3>
                </Grid>
                <Grid item xs={12}>
                    <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
                        <UserImages currentUser={currentUser} id={user.id}/>
                    </div>
                </Grid>
            </Grid>
        }
        </>
    )
}

export default UserProfilePage;