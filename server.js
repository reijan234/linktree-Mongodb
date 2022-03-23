const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose")

const User = require("./models/user");
const Link = require("./models/link")
const UserController = require("./src/controllers/userController");
const DefaultUser = "623205f559b114446f2db2d1";

const port = 3001;
const DatabaseName = "linktree";
const password = "3IUIDk3txna4T3RL";


const app = express();
app.use(cors())

app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json());


app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

//Rotas

app.get("/", UserController.index);

app.get("/links", UserController.links);

app.get("/account", UserController.account);

app.post("/creat/user", UserController.creatUser);

app.post("/link/create", UserController.creatlink); 

app.post("/link/update", UserController.updateLink);

app.delete("/link/delete/:IdLink", UserController.deleteLink);

//inicialização do server

mongoose.connect("mongodb+srv://maxRe:iZcRDNZPCWfUeIyJ@linktree.fcmpv.mongodb.net/linktree?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    app.listen(port || 3001, () => {
        console.log(`Server Running on ${port || 3001}`);
    })
})
.catch((err) => console.log(err))




// https://cloud.mongodb.com/v2/62278962cc0f7c5a9f48fbcb#security/database/users

