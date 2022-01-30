const faculty = require('../model/facultySchema')
const cors = require('cors')
//
const files = require('../model/filesSchema')
const express = require('express')
const { google } = require('googleapis')
const fs = require('fs');
const app = express();
const SCOPES = ['https://www.googleapis.com/auth/drive']
const multer = require('multer')
// require('dotenv/config')
const KEYFILEPATH = 'privatekey.json';
const path = require('path')
const router = express.Router();

const filePath=path.join(__dirname, 'public');
app.use(express.static(filePath)); 
app.set('view engine', 'ejs');

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES
});


var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./files");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
});

var upload = multer({
    storage: Storage,
}).single("file"); //Field name and max count



router.post('/', (req, res) => {
    upload(req, res, async function (err) {
        if (err) throw err
        else {
            const driveService = google.drive({ version: 'v3', auth: auth });
            const fileType = req.file.mimetype;
            const fileMetaData = {
                'name': req.file.filename,
                'parents': ['1uwX_TMHg1LVy7bu9q92XDtX2PT3C58cy']
            }

            const media = {
                MimeType: fileType,
                body: fs.createReadStream(req.file.path)
            }
            const response = await driveService.files.create({
                resource: fileMetaData,
                media: media,
                fields: 'id'
            }, (err, file) => {
                if (err) throw err
                // delete file from files folder and save fileId to db
                const FILE_ID = file.data.id;
                const newFile = new files({
                   driveId: FILE_ID,mimeType: fileType
                })
                newFile.save();
                fs.unlinkSync(req.file.path)
                res.send("File Saved TO DB").status(200);
            })
        }
    })
})


module.exports = router