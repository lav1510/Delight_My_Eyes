const mongoose =  require ('mongoose')

const userSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    email : {
        type: String,
        required :true,
        unique : true,
    },
    password : String,
    repassword : String,
    date:{ type: Date, default: Date.now}
})

module.exports = mongoose.model("UserModel",userSchema)