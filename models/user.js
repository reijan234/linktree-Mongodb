const mongoose = require('mongoose');


const user = new mongoose.Schema({
    
    Name: {
        type:String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required:false
    }
})

module.exports = mongoose.model("user", user)