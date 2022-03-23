// const router = require("express").Router()
// const models = require("../../models/modelClient")
// const models = require("./models/client")

// router.post("/client", async(req, res) => {
//     const {name, password} = req.body;

//     const client = {
//         name,
//         password
//     }

//     if(!name){
//         res.status(422).json({error: "o nome é obrigatório"})
//     }

//     if(!password){
//         res.status(422).json({error: "A senha é obrigatória"})
//     }

//    try{
//         await models.create(client);

//         res.status(201).json({message: 'Pessoa inserida no sistema com sucesso!'})

//    } catch(error){
//         res.status(500).json({error: error})
//    }
// })

// module.exports = router