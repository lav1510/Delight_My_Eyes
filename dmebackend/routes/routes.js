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



module.exports = router