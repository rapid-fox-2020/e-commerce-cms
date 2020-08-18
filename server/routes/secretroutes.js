const secretRoutes = require('express').Router()
const SecretController = require("../controllers/secretcontroller.js")
const { userAuthentication, userAuthorization } = require("../middlewares/auth.js")
const { upload } = require("../helpers/multerUpload.js")


secretRoutes.get("/secrets", userAuthentication, userAuthorization, SecretController.showAll)

secretRoutes.post("/secrets", userAuthentication, userAuthorization, upload.single('file'), SecretController.addImage)



module.exports = secretRoutes
