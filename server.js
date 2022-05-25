const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const fs = require("fs");
const uploadConfig = require("./middleware/uploadImage")

const routes = require("./src/routes/router");
const User = require("./models/user");
const Link = require("./models/link");
const UserController = require("./src/controllers/userController");
const DefaultUser = "623205f559b114446f2db2d1";

const port = 3001;
const app = express();

app.use(cors({origin: "*"}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(routes)
app.use(bodyParser.urlencoded({extended: true}))

app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use('/assets/iconsLinks', express.static(uploadConfig.uploadFolder));
app.use('/assets/ImageUser', express.static(uploadConfig.uploadFolder));

mongoose.connect("mongodb+srv://maxRe:iZcRDNZPCWfUeIyJ@linktree.fcmpv.mongodb.net/linktree?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    app.listen(port || 3001, () => {
        console.log(`Server Running on ${port || 3001}`);
    })
})
.catch((err) => console.log(err));

// criar login:
// encriptar a senha [ok]
// criar token
// validação do token a casa 30s
