import './App.css';
import "./Component/style.css"
import Home from './Component/Home';
import AlreadyLogin from './Component/AlreadyLogin';
import { Login } from './Component/Login';
import Register from './Component/Register';
import MyFavourites from './Component/MyFavourites';
import AdminPage from './Component/AdminPage';
import Navbar from "./Component/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import data from './ContextApi';
import { useState, useEffect } from 'react';

function App() {
  const [userdata,setUserData] = useState({})
  const [loggedInUser, setLoggedInUser] = useState({});
  useEffect(() => {
    setLoggedInUser( localStorage.getItem("userr"));
  }, []);

  return ( 
    <div className="App">
      <Navbar />
      <data.Provider value={{userdata,setUserData}}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={loggedInUser? <AlreadyLogin /> : <Login/>}/>
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/myfavourites" element={<MyFavourites />} />
          </Routes>
        </Router>
      </data.Provider>
    </div>
    
  );
}

export default App;
