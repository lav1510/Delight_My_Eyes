import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TrailerCard from './TrailerCard';


const MyFavourites = () => {

  const [message, setMessage] = useState('')
  const [trailers, setTrailers] = useState([]);

//   useEffect(() => {
//     getAllTrailers();
// }, []);

const [logUser, setLogUser] = useState("");
  useEffect(() => {
    getAllTrailers();
    setLogUser( localStorage.getItem("userr"));
  }, []);
  
  const getAllTrailers = () => {
    console.log(logUser)
    if(logUser) {
      //axios get nou cu user email si primesc info favorite lui si nr fav
      axios.get("http://localhost:4000/app/userfav", { params: { email: logUser } })
      .then( res => {
        console.log(res.data);
          const usertrailers = res.data.trailer;  
          setTrailers([...usertrailers]);
          console.log(trailers);        

          if(res.data.message > 0){
             setMessage("Here are your favourites:");
          }else{
             setMessage("You don't have favourites. Add some!");
          }
        
        })
        .catch(err => {
          console.log(err.response);
          alert('Cannot find favourites.');
        });
    }
    else{
      //alert('Something went wrong on logging you.');
    }

  }
   

    return (
      <div id="cont_fav" >
          <label id='lbl'> {message} </label>  
          <TrailerCard trailers={trailers} />
      </div>
    )
  
}

export default MyFavourites