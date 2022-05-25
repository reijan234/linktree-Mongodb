const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");

let senhaVindaDoENV = "ruanzinho24"

module.exports = {
    async index(req, res){

    

        try{
            const users = await User.find();

            return res.status(200).json({ users });
        }catch(err){
            res.status(500).json({error: err.message });
        };
        
    },

    async store(req, res){

        //criação de usuario

        const {Name, password, email} = req.body;

        

        const user = await User.findOne({email: email });
        if(user) return res.status(400).json({error: "user already exists"})
        
        try{
            await User.create({
                Name, 
                password, 
                email})
            res.status(201).json({message: "User created "})
        }catch(error){
            res.status(400).json({error: "all data must be sent"})
        }
    },

    async find(req, res){

    // login

    const {password, email} = req.body;
    
    const user = await User.findOne({email: email});
    if(!user) return res.status(400).json({error: "Email incorrect"});

    const passwordAndUserMath = bcrypt.compareSync(password, user.password);
    if(!passwordAndUserMath) return res.status(400).json({error: "Password incorrect"})

    const token = jwt.sign({_id: user._id}, senhaVindaDoENV)
    console.log(token)

    res.header("authorization", token)


    //parte a ser descartada
        // try{
        //     const user = await User.findById(DefaultUser);
        // }catch(err){
        //     res.status(500).json({message: "non-existing user", erro: err });
        // } 

        // console.log("foi")
    },
}

