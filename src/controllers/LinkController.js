const User = require("../../models/user");
const Link = require("../../models/link");
const fs = require("fs");
const { promisify } = require("util");
const path = require("path")
const uploadImg = require("../../middleware/uploadImage");
const DefaultUser = "623205f559b114446f2db2d1"

module.exports = {
    async index(req, res) {
        const user = await User.findById(DefaultUser);

        if (user) {
            const links = await Link.find({ IdUser: DefaultUser })
            res.status(200).json({ user, links });
        } else {
            res.status(500).json({ message: "non-existing user" });
        }
    },

    async store(req, res) {

        const links = await Link.find({ IdUser: DefaultUser })
        const index = links.length

        const { IdUser, nameLink, urlLink, ImageLink } = req.body;

        const send = await Link.create({ IdUser, nameLink, urlLink, ImageLink, index });
        send.save()
            .then(data => {
                res.json(data);
            }).catch(err => { res.status(500).json({ error: err }) })
    },

    async find(req, res) {
        const { IdUser, IdLink } = req.query

        const send = await Link.find({
            _id: IdLink,
            IdUser: IdUser,
        })
            .then(data => {
                res.json(data);
            }).catch(err => { res.status(500).json({ error: err }) })
    },

    async update(req, res) {
        const { IdUser, IdLink, nameLink, urlLink, ImageLink } = req.body;
        try {
            const link = await Link.updateOne({
                _id: IdLink,
                IdUser: IdUser
            }, {
                nameLink: nameLink,
                urlLink: urlLink,
                ImageLink: ImageLink,
            });
            res.status(200).json({ message: "link updated" });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    async currentIndex(req, res) {
        const { indexCards } = req.body;
    
        let resp = [];
        try {
            indexCards.forEach(async card => {

                const link = await Link.updateOne({
                    _id: card.IdLink,
                    IdUser: card.IdUser
                }, {
                    index: card.index,
                });
                resp.push(link)

            });
            res.status(200).json({ message: "Links index updated " });
        
        } catch (err) {
            res.status(500).json({ error: err });
        }

    },

    async delete(req, res) {
        const { IdLink, IdUser } = req.params;
        let beenDeleted;
        if (IdLink != undefined) {
            try {

                const send = await Link.find({
                    _id: IdLink,
                    IdUser: IdUser,
                })


                let ImageLink = send[0].ImageLink;

                if (send != undefined && send != null) {
                    let link = await Link.deleteOne({ _id: IdLink });
                    beenDeleted = link.acknowledged
                }
                if (ImageLink != undefined && beenDeleted == true) {
                    await promisify(fs.unlink)(path.resolve(__dirname, `../../assets/${ImageLink}`));
                }
                res.status(200).json({ message: "link deleted" })
            } catch (err) {
                res.status(500).json({ error: err });
            }

        } else {
            res.status(400).json({ error: "link é invalido" })
        }


    },

    async storeImg(req, res) {
        const { filename, size } = req.file;
        res.json(filename);

    },

    async deletImg(req, res) {
        const { IdLink, IdUser, ImageLinkDelet } = req.params

        if (ImageLinkDelet != undefined) {
            try {
                let deletFile = await promisify(fs.unlink)(path.resolve(__dirname, `../../assets/${ImageLinkDelet}`));
                res.status(200).json({ message: "image delet" })
            } catch (error) {
                res.status(400).json({ error: error })
            }
        } else {
            res.status(400).json({ message: 'non-existent image' })
        }


    }
}