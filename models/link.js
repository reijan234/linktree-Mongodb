const mongoose = require('mongoose');

const link = new mongoose.Schema({
    
    idUser:{
        type:Object,
        required: true,
    },
    nameLink: {
        type:String,
        required: true,
    },
    urlLink: {
        type: String,
        required: true
    },
    ImageLink: {
        type: String,
        required: true,
    }
    
})

module.exports = mongoose.model("link", link)