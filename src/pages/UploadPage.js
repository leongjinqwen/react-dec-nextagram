import React, {useState} from 'react';
import { Form,FormGroup, Input,FormText,Button, Label } from "reactstrap"
import axios from "axios"
import { toast } from 'react-toastify';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
// import IconButton from '@material-ui/core/IconButton';
// import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Redirect } from "react-router-dom";

const UploadPage = ({currentUser}) => {
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
                    image={previewImage}
                />
                <CardContent style={{padding:"10px 12px"}}>
                    <Form onSubmit={handleSubmit}>
                        <FormText color="muted">
                            Make sure the image being uploaded is a supported format.
                        </FormText>
                        {/* <IconButton style={{outline:'none',padding:"4px 8px"}} aria-label="upload"> */}
                            {/* <Label for="upload-photo" style={{margin:0}}><AddCircleOutlineIcon style={{color:"blue"}}/></Label> */}
                            <Input type="file" name="image-file" id="upload-photo" onChange={handleInput} />
                        {/* </IconButton> */}
                        <Button type="submit" color="primary">Upload</Button>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default UploadPage;
