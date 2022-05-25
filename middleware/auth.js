const jwt = require("jsonwebtoken")
let senhaVindaDoENV = "ruanzinho24"

module.exports = function(req, res, next){

    const authHeader = req.headers['autorization-token'];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) return res.status(401).send("Access Denied")

    try {
        jwt.verify(token, senhaVindaDoENV)
        next()
    } catch (error) {
        res.status(400).json({msg: "token inválido"})
    }
}