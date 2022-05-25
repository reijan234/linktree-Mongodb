const express = require('express');
const multer = require("multer")

const UserController = require("../controllers/userController");
const LinkController = require("../controllers/LinkController");
const ViewController = require("../controllers/viewController");
const uploadImage = require("../../middleware/uploadImage");
const auth = require("../../middleware/auth");

const routes = express.Router();
const upload = multer({ storage: uploadImage.storage });

routes.get("/user", UserController.index);
routes.post("/user/creat", UserController.store);
routes.post("/login", UserController.find)

routes.get("/links", LinkController.index);
routes.post("/link/creat", LinkController.store);
routes.get("/link/find", LinkController.find);
routes.post("/link/update", LinkController.update);
routes.post("/link/update/currentIndex", LinkController.currentIndex)
routes.delete("/link/delete/:IdLink/:IdUser", LinkController.delete);

routes.post("/link/image/creat", upload.single("avatar") , LinkController.storeImg)
routes.delete("/link/image/delete/:IdLink/:IdUser/:ImageLinkDelet",LinkController.deletImg);

routes.get("/account/:idUser", auth, ViewController.account);
routes.get('/user/:IdUser', ViewController.public)
routes.get('/login', ViewController.login)
routes.get("/createUser", ViewController.register)

module.exports = routes;
