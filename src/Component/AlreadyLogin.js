import React from 'react'
import { useNavigate } from 'react-router-dom'



const AlreadyLogin = () => {
  const navigate = useNavigate()
  
 const logout = ()=>{
    localStorage.clear();
    navigate("/")
  }

  return (
    <div id="cont_home">
      <div>
        <h1>You are already logged in. </h1>  
      </div>
        <button className='btn' onClick={logout}>Logout</button>
    </div>
  )
}

export default AlreadyLogin