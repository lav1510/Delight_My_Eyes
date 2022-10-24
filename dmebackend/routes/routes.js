const express = require('express')
const router = express.Router()
const UserModel = require('../models/SignUpModels')
//const bcrypt = require('bcrypt')

router.post("/register", (req,res)=> {

    //const saltPassword= await bcrypt.genSalt(10)
    //const securePassword = await bcrypt.hash(request.body.password, saltPassword)
    console.log(req.body) 
    const {firstName,lastName,email,password,repassword} = req.body;
    UserModel.findOne({email: email},(err,user)=>{
            if(user){
                res.send({message : "This email id already Register"})
            }
            else{
                const user = new UserModel({
                    firstName,
                    lastName,
                    email,
                    password,
                    repassword,
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

app.post("/login",(req,res)=>{
    console.log(req.body)
    const {email,password} = req.body
    UserModel.findOne({email : email},(err,user)=>{
            if(user){
                if(password == user.password){
                    res.send({message : "Login SuccessFull",user})
                }
                else{
                    res.send({message : "Password didn't match"})
                }
            }
            else{
                res.send({message : "This email id is not register"})
            }
    })
})



module.exports = router