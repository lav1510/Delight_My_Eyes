const express = require('express')
const router = express.Router()
const UserModel = require('../models/SignUpModels')
const TrailerModel = require('../models/TrailerModels')
const bcrypt = require('bcrypt')
var getYouTubeID = require('get-youtube-id');

router.post("/register", async(req,res)=> {
    
    console.log(req.body) 
    const {firstName,lastName,email,password} = req.body;
    // generate salt to hash password
    const saltPassword= await bcrypt.genSalt(10)
    // now we set user password to hashed password
    const securePassword = await bcrypt.hash(password, saltPassword)
    
    UserModel.findOne({email: email},(err,user)=>{
            if(user){
                res.send({message : "This email id already Register"})
            }
            else{
                const user = new UserModel({
                    firstName,
                    lastName,
                    email,
                    password:securePassword,
                })
                user.save();
                res.send({message : "Successfull Register"})
            }
    })


   /* signedUpUser.save()
    .then(data =>{
        response.json(data)
    })
    .catch(error =>{
        response.json(error)
    })*/
})

router.post("/login", async(req,res)=>{
    const body = req.body;
    const user = await UserModel.findOne({email : body.email});
            if(user){
                // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(body.password, user.password);
                if(validPassword){
                    res.send({message : "Successfully logged in",user})
                }
                else{
                    res.send({message : "Password didn't match"})
                }
            }
              else{
                res.send({message : "This email id is not register"})
            
            }
});

router.post("/fav", async(req,res)=>{
    const body = req.body;
    if(req.body.fav != "") {
        const user = await UserModel.findOneAndUpdate(
            {email : body.email},
            {
            $addToSet: { //add to set insead of push resolved dubplicated problem
                fav: req.body.fav
            },
            new: true
            }
        )
    }
      res.send({message : "Updated favourite list."})
   
           
});

router.get("/userfav", async (req, res) => {
    const emaill = req.query.email;
	let trailer = [] 
    const user = await UserModel.findOne({email : emaill});
    if(user){
        
         let len = Object.keys(user.fav).length;
         for(let i=0; i<len; i++)
        {
            trailer[i]  = await TrailerModel.findOne({url : user.fav[i]})
            
        }

        //trailer.data = JSON.stringify(trailer.data)
        res.send({message : len, trailer})
    }
      else{
        res.send("") //nu are fav
    
    }
});

router.get("/trailer", async (req, res) => {
	const trailer = await TrailerModel.aggregate([{ $sample: { size: 1 } }])
	res.send(trailer[0])
});


router.post("/trailer", async (req, res) => {

    console.log(req.body) 
    const {url, title, genres, type} = req.body;
    console.log(title);

    TrailerModel.findOne({title: title},(err,trailer)=>{
        if(trailer){
            res.send({message : "This trailer id already in Server."})
        }
        else{
            const trailer = new TrailerModel({
                url,
                title,
                genres,
                type
            })
            trailer.save();
            res.send({message : "Added a New Trailer Successfully"})
        }

        })

        });




module.exports = router