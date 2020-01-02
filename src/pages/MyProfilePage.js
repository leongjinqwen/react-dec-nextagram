import React, {useState,useEffect} from "react"
import axios from "axios"
import LoadingIndicator from "../components/LoadingIndicator"
import Image from "react-graceful-image";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import UserImages from "../containers/UserImages";
import { Redirect,useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const MyProfilePage = ({currentUser}) => {
    // const [images,setImages] = useState([])
    let history = useHistory();
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
        const jwt = localStorage.getItem("token")
        axios({
            method: 'GET',
            url: 'https://insta.nextacademy.com/api/v1/images/me',
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        .then(result => {
            setIsLoading(false)
            // setImages(result.data)
        })
        .catch(error => {
            console.log('ERROR: ', error)
        })
    },[])

    if (!currentUser){
        toast("Login to access this page.")
        history.push("/")
    }
    return (
        <>
        {
            isLoading ? <LoadingIndicator /> :
            <Grid container spacing={3} className={classes.root}>
                <Grid item xs={12} className="text-center p-5">
                    <Image src={currentUser.profile_picture} width="200px" style={image} alt={currentUser.username}/>
                    <h3>@{currentUser.username}</h3>
                </Grid>
                <Grid item xs={12}>
                    <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
                        <UserImages currentUser={currentUser} id={currentUser.id} />
                    </div>
                </Grid>
            </Grid>
        }
        </>
    )
}

export default MyProfilePage;