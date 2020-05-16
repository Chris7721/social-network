const path = require('path')
const multer = require('multer')
const dataUri = require('datauri')
const storage = multer.memoryStorage();
const dUri = new dataUri();

const upload = multer({limits: {
    fileSize: 1000000
},
fileFilter(req, file, cb){
    if(!(file.originalname.endsWith('.jpg') || file.originalname.endsWith('.png') || file.originalname.endsWith('.jpeg') || file.originalname.endsWith('.gif') )){
        return cb(new Error("File must be an image format format"))
    }
    cb(undefined, true)
},storage
}).single('gif_post')

const imagePath = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

module.exports = {upload, imagePath}