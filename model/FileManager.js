const mongoose = require('mongoose')
const FileManagerSchema = mongoose.Schema({
    uid: String,
    image:String
})
module.exports = mongoose.model('FileManager', FileManagerSchema)