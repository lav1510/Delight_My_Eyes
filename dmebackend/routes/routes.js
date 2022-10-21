const express = require('express')
const router = express.Router()
const signUpTemplateCopy = require('../models/SignUpModels')

router.post('/singup', (request, response)=> {
    const signedUpUser = new signUpTemplateCopy({
        fullName:request.body.fullName,
        username:request.body.username,
        email:request.body.email,
        password:require.body.password
    })

    signedUpUser.save()
    .then(data=>{
        response.json(data)
    })
    .catch(error =>{
        response.json(error)
    })
})

module.exports = router