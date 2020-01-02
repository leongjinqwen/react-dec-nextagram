import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Carousel,CarouselItem,CarouselControl,CarouselIndicators} from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Likes from './Likes';
import Comment from './Comment';


const UserImages = ({ id,page,currentUser }) => {
  const useStyles = makeStyles(theme => ({
    card: {
      width: 300,
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      marginTop: 10,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
  }));
  const classes = useStyles();
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }
    const [images,setImages] = useState([])

    useEffect(()=>{
      if (id){
        axios.get(`https://insta.nextacademy.com/api/v2/images?userId=${id}`)
        .then(result => {
            setImages(result.data)
        })
        .catch(error => {
            console.log('ERROR: ', error)
        })
      }
    },[id])
    const defaultImage = [1].map((item)=>{
      return(
        <CarouselItem
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          key={item}
        >
          <img src="https://9to5google.com/wp-content/uploads/sites/4/2017/02/chromeos_newdefaultwall_1-e1487111985183.png" alt="default" height="300px" style={{display: "block",marginLeft: "auto",marginRight: "auto"}}/>
        </CarouselItem>
      )
    })
  const slides = images.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.id}
      >
        <img src={item.url} alt={item.id}  height="300px" style={{display: "block",marginLeft: "auto",marginRight: "auto"}}/>
      </CarouselItem>
    );
  });
  if (page==="homepage"){
    return (
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
      >
        <CarouselIndicators items={images} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {images.length===0 ? defaultImage : slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
    );
  }
  return(
    <>
    {
      images.map((item)=>(
        <Card key={item.id} className={classes.card}>
          <CardMedia
            className={classes.media}
            image={item.url}
          />
          {
            currentUser ? 
            <>
              <CardActions disableSpacing style={{padding:0}}>
                <Likes imageId={item.id} />
              </CardActions>
              <CardContent style={{padding:0}}>
                <Comment imageId={item.id} />
              </CardContent>
            </>
            : null
          }
        </Card>
      ))
    }
    </>
  )
}

export default UserImages;