const routes = require("express").Router()
const UserController = require("../controllers/usercontroller.js")
const productRoutes =  require("./productroutes.js")
const bannerRoutes = require("./bannerroutes.js")
const secretRoutes = require("./secretroutes.js")


routes.post("/login",UserController.login)

routes.use(productRoutes)

routes.use(bannerRoutes)

routes.use(secretRoutes)


module.exports = routes
