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
    fav : [String], //lista nume trailer favorit
    isAdmin: {type: Boolean, default:false},
    date:{ type: Date, default: Date.now}
})

module.exports = mongoose.model("UserModel",userSchema)