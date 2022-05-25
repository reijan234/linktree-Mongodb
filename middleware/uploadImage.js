const multer = require("multer");
const path = require("path")
const {uuid} = require("uuidv4")

const  uploadFolder = path.resolve(__dirname, "../assets/iconsLinks");

const uploadConfig = {
    uploadFolder,
    storage: multer.diskStorage({
      destination: uploadFolder,
      filename(req, file, callback) {
        const fileName = `${uuid()}-${file.originalname}`;
  
        return callback(null, fileName);
      },
      limits:{
        fileSize: 2 * 1024 * 1024
      },
      fileFilter: (req, file, callback) => {
        const allowedMines = [
          "image/jpeg",
          "image/pjpeg",
          "image/png",
          "image/gif"
        ];

        if(allowedMines.includes(file.mimetype)){
          callback(null, true);
        }else{
          callback(new Error("Invalid file type."))
        }
      }
    }),
  };

module.exports= uploadConfig;