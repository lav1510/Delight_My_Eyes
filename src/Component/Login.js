import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import data from '../ContextApi'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    useEffect(() => {
        // storing input name
        localStorage.setItem("user", JSON.stringify(user));
      }, [user]);

    const {userdata, setUserData} = useContext(data)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:4000/app/login", user)
            .then((res) => {
                alert(res.data.message)
                setUserData(res.data.user)
                localStorage.setItem('userr', res.data.user.email)
                
                console.log(userdata)
                if(res.data.user.isAdmin === true){
                    navigate("/admin")
                }
                else{
                    navigate("/")
                }
            })
    }

    // console.log(user)

    return (
        <div className='container'>
            <form>
                <label htmlFor='email'>Email Id</label>
                <input type="email" id="email" name='email' value={user.email} onChange={handleChange} />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name='password' value={user.password} onChange={handleChange} />

                <div className='btn-container'>
                    <button className="btn" onClick={handleSubmit}>Login</button>
                    <button className="btn" onClick={()=>navigate("/register")}>Register</button>
                </div>
            </form>
        </div>
    )
}
