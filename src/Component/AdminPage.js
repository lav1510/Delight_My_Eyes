import React ,{useState}from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'


const AdminPage = () => {
    const [trailer, setTrailer] = useState({
        url: "",
        title: "",
        genres: "",
        type: ""
      })

      const navigate = useNavigate()
  
      const logout = ()=>{
          localStorage.clear();
          alert("Succesfully logged out.");
          navigate("/login")
       }

    const handleChange = (e)=>{
        const { name , value} = e.target;
        setTrailer((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
            console.log(trailer)
        const {url, title, genres,type} = trailer
        if(url && title && genres && type){
            if(url.indexOf("www.youtube.com")>0)
            {
                await axios.post("http://localhost:4000/app/trailer",trailer)
                    .then((res) => {
                        alert(res.data.message)

                    })
                    .catch(err => {
                        console.log(err.response);
                        alert('Cannot add trailer.');
                    });


                const inputs = document.querySelectorAll('#url, #title, #genres, #type');
                  
                inputs.forEach(input => {
                    input.value = '';
                });

            }
            else{
                alert("Please provide a Youtube url.")
            }
            
        }
        else{
            alert("Enter the Required Fields")
        }

            

    }
  return (
    <div className='container'>
        <div id='admintitle'> Add a new trailer!</div>
        <form>
            <label htmlFor='url'>Youtube URL</label>
            <input type="text" id="url" onChange={handleChange} name="url" value={trailer.url}/>

            <label htmlFor='title'>Title</label>
            <input type="text" id="title" onChange={handleChange} name="title" value={trailer.title}/>

            <label htmlFor='genres'>Genre</label>
            <input type="text" id="genres"  name='genres' value={trailer.genres} onChange={handleChange}/>

            <label htmlFor="type">Type</label>
            <input type="text" id="type" name='type' value={trailer.type} onChange={handleChange}/>
            
            
            <button className="btn" onClick={handleSubmit}>Submit</button>
            <button className="btn" onClick={logout}>Logout</button>
        </form>
    </div>
  )
}

export default AdminPage