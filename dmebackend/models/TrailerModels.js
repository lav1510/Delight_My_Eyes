const mongoose =  require ('mongoose')

const trailerSchema = new mongoose.Schema({
    url : String,
    title : String,
        
    genres : String,
    type: String,
    date:{ type: Date, default: Date.now}
})

module.exports = mongoose.model("TrailerModel",trailerSchema)