import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import YouTube from 'react-youtube';
import Skeleton from '@mui/material/Skeleton';

var getYouTubeID = require('get-youtube-id');

export default function TrailerCard(props) {

  const displayTrailer = (props) => {
    const { loading = false, trailers } = props;
    //const {trailers} = props;

    const opts = {
      height: '240',
      width: '426',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
      },
    };

    

    if(trailers.length > 0) {
      return (
        trailers.map((trailer, index)  => {
          console.log(trailer);
          return (
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
              {loading ? (
        <Skeleton sx={{ height: 240,  bgcolor: 'grey.900'}} animation="wave"  variant="rectangular" />
      ) : (
        <div>
                <YouTube videoId={getYouTubeID(trailer.url)} opts={opts}  />
              </div>
      )}
              
                    <Typography><b>Title:</b> {trailer.title}</Typography>
                    <Typography><b>Genre:</b> {trailer.genres}</Typography>
                    <Typography><b>Type:</b> {trailer.type}</Typography>
                  </CardContent>
            </Card>
            // <div key={trailer._id}>
            //   <p><b>URL:</b> {trailer.url}</p>
            //   <p><b>Title:</b> {trailer.title}</p>
            //   <p><b>Genre:</b> {trailer.genres}</p>
            //   <p><b>Type:</b> {trailer.type}</p>
            // </div>
          )
        })
    
      )
    }
  // } else {
  //   return (<h3>You do not have favourites. Add some!</h3>)
  // }
}
return (
  <>
    {displayTrailer(props)}
  </>
)
}