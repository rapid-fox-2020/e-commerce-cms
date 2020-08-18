const multer = require('multer');
const {google} = require('googleapis')
var GoogleDriveStorage = require('multer-google-drive')
const { authorize } = require('./googledrive.js')
const auth = authorize()
const drive = google.drive({version: 'v3', auth: auth})

const upload = multer({
  storage: GoogleDriveStorage({
    drive: drive,
    parents: process.env.DRIVE_FOLDER,
    fileName: function (req, file, cb) {
      let filename = `test-${file.originalname}`;
      cb(null, filename);
    }
  })
})

module.exports = { upload }
