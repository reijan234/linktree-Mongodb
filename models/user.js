const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")


const userSchema = new mongoose.Schema({
    
    Name: {
        type:String,
        required: true,
        min: 3,
        max: 50
    },
    password: {
        type: String,
        required: true,
        min: 6,
        select: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match:/.+a.+\..+/,
        
    },
    ImgUser: {
        type: String,
        required: false
    }
});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
const user = mongoose.model("user", userSchema)
module.exports = user