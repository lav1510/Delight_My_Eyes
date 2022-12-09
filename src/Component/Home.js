import React, { useState, useEffect } from 'react'
import axios from 'axios'
import YouTube from 'react-youtube';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';



var getYouTubeID = require('get-youtube-id');

const Home = () => {
  
  const navigate = useNavigate()
  const [trailer, setTrailer] = useState({
    url: "https://www.youtube.com/watch?v=0zhZtGSOFBw&ab_channel=KrinzZ",
    title: "One Piece",
    genres: "Anime",
    type: "TV Show"
  })

  const [loggedInUser, setLoggedInUser] = useState("");
  useEffect(() => {
    setLoggedInUser( localStorage.getItem("userr"));
  }, []);

  const [id, setId] = useState("0zhZtGSOFBw")
  const [user, setUser] = useState({
          email: loggedInUser,
          fav: trailer.url
      })
  
  
  const [active, setActive] = useState(false);

  const handleFav= () => {
    if(loggedInUser){
      setActive(!active);
      console.log(user);
      axios.post("http://localhost:4000/app/fav", user)
          .then( res => {
            alert('Added to favourites!');
          }   
          )
          .catch(err => {
            console.log(err.response);
            alert('Cannot add to favourites.');
          });
    }
    else{
      alert('You need to be logged in for this.');
    }
  };

  const handleGoFav= () => {
    if(loggedInUser){
      navigate("/myfavourites")
    }
    else{
      alert('You need to be logged in for this.');
    }
  };


const handleNxt = async (e) => {
  
  
   await axios.get("http://localhost:4000/app/trailer")
    .then( res => {
      setTrailer(res.data);
      setId(getYouTubeID(res.data.url));
      setUser({email:loggedInUser, fav:res.data.url});
      console.log(user)
      
      if(active) setActive(!active);
    })
    .catch(err => {
      console.log(err.response);
      alert('Cannot find next video.');
    });

    
}


  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  

  return (
    <div id="cont_home">
      <div>
        <YouTube videoId={id} opts={opts}  />
      </div>
        <IconButton className='btn' onClick={handleFav} aria-label="favourite" style={{color : active ? "red" : "grey" }} title="Add this to favourites!">
        <FavoriteIcon />
      </IconButton>
      <IconButton className='btn' onClick={handleGoFav}   title="Go to my favourites!" aria-label="favourite" >
        <StarIcon sx={{ fontSize: 28 }}/>
      </IconButton>
      <IconButton className='btn' onClick={handleNxt}   title="Next trailer!" aria-label="favourite" >
        <NavigateNextIcon fontSize="large"/>
      </IconButton>
      <div className='text_home' id="lblt">
         <label>Title: {trailer.title}</label>
      </div>
      <div className='text_home' id="lblg">
         <label>Genre: {trailer.genres}</label>
      </div>
      <div className='text_home' id="lblx">
         <label>Type: {trailer.type}</label>
      </div>
    </div>
  )
}

export default Home