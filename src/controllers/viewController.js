const User = require("../../models/user");
const Link = require("../../models/link");
const { render } = require("ejs");
const DefaultUser = "623205f559b114446f2db2d1";

module.exports = {
    async account(req, res){
        const userData = await User.findById(DefaultUser);

        if(userData){
            const linksData = await Link.find({IdUser: DefaultUser}).sort({index: -1});
            res.render("account", {userData, linksData});
        }
        else{
        res.status(500).json({message: "non-existing user", error:err})
        }
    },

    async register(req, res){
        res.render("createUser")
    },

    async login(req, res){
        const {token} = req.header
        req.session.valid = true;
        if(token){
            res.render("createUser")
        }else{
            res.render("login")
        }

        
    },

    async public(req, res){
        const {IdUser} = req.params

        const data = await User.find({_id: IdUser})
        
        if(!data) {
            dataUser = false; 
            res.status(500).json({message: "non-existing user",})
        }
    
        const dataLink = await Link.find({IdUser: IdUser}).sort({index: -1});
        let dataUser = data[0]
        console.log(dataUser.ImgUser)

        res.render("public", {dataUser, dataLink})
    

}
}