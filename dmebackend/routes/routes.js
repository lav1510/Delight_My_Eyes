const express = require('express')
const router = express.Router()
const UserModel = require('../models/SignUpModels')
const bcrypt = require('bcrypt')

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
                    password:securePassword
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
                    res.send({message : "Login SuccessFull",user})
                }
                else{
                    res.send({message : "Password didn't match"})
                }
            }
              else{
                res.send({message : "This email id is not register"})
            
            }
});



module.exports = router