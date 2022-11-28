import React, { useContext, useState } from 'react'
import data from '../ContextApi'
import YouTube from 'react-youtube';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';


var getYouTubeID = require('get-youtube-id');

const Home = () => {
  const {userdata,setUserData} = useContext(data)
  //console.log(userdata.firstName)
  const [id, setId] = useState()
  const [active, setActive] = useState(false);

  const handleFav= () => {
    setActive(!active);
  };

 const logout = ()=>{
    setUserData({})
  }



  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  

  return (
    <div id="cont_home">
      <div>
        <YouTube videoId="0zhZtGSOFBw" opts={opts}  />
      </div>
        <button className='btn' onClick={logout}>Logout</button>
        <IconButton className='btn' onClick={handleFav} aria-label="favourite" style={{color : active ? "grey" : "red" }}>
        <FavoriteIcon />
      </IconButton>
        <button className='btn' onClick={logout}>Next</button>
    </div>
  )
}

export default Home