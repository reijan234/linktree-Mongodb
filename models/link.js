const mongoose = require('mongoose');
const { index } = require('../src/controllers/LinkController');

const link = new mongoose.Schema({
    
    IdUser:{
        type: Object,
        required: true,
    },
    nameLink: {
        type: String,
        required: true,
    },
    urlLink: {
        type: String,
        required: true
    },
    ImageLink: {
        type: String,
        required: false,
    },
    index: {
        type: Number,
        required: true
    }
    
})

module.exports = mongoose.model("link", link)