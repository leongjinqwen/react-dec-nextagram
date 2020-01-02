import React, {useState} from 'react';
import { Input,FormText, Label } from "reactstrap"
import axios from "axios"
import { toast } from 'react-toastify';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from "react-router-dom";


const UploadPage = ({currentUser}) => {
    const chooseButton = {
        border: "1px solid rgb(235, 28, 131)",
        background: "linear-gradient(to right,rgb(252, 142, 252),rgb(248, 186, 195),rgb(243, 208, 144),rgb(245, 245, 177))",
        padding:"5px 10px",
        borderRadius: "15px",
        cursor:"pointer",
        marginRight:"10px",
        color:"black",
        // height:"80px"
    }
    const useStyles = makeStyles(theme => ({
        card: {
          maxWidth: 600,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 10,
        },
        media: {
          minHeight: 400,
        //   paddingTop: '56.25%', // 16:9
        },
    }));
    const classes = useStyles();
    const [imageFile, setImageFile] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)

    const handleInput = (e) => {
        setPreviewImage(URL.createObjectURL(e.target.files[0]))
        setImageFile(e.target.files[0]) 
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const jwt = localStorage.getItem("token")
        let formData = new FormData();
        formData.append("image", imageFile);
        axios.post("https://insta.nextacademy.com/api/v1/images/", formData, {
            headers: { Authorization: `Bearer ${jwt}` }
        })
        .then(response => {
            if (response.data.success) {
                toast.success("Image Uploaded Successfully!")
                setPreviewImage(null)
                setImageFile(null)
            }
          })
        .catch(error => {
            console.log(error.response);
        });
    }
    if (!currentUser){
        toast("Login to access this page.")
        return <Redirect to="/" />
    }
    return(
        <div>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={previewImage ? previewImage : "https://www.renovabike.it/wp-content/themes/gecko/assets/images/placeholder.png"}
                />
                <CardContent style={{padding:"10px 12px"}}>
                    <FormText color="muted">
                        Make sure the image being uploaded is a supported format.
                    </FormText>
                    <Label for="upload-photo" style={chooseButton}>Choose</Label>
                    <Input type="file" capture name="image-file" id="upload-photo" onChange={handleInput} />
                    {imageFile ?
                        <Label onClick={handleSubmit} style={chooseButton}>Upload</Label>
                        : null
                    }
                </CardContent>
            </Card>
        </div>
    )
}
export default UploadPage;
