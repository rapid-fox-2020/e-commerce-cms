const routes = require("express").Router()
const UserController = require("../controllers/usercontroller.js")
const productRoutes =  require("./productroutes.js")

// routes.post("/register",UserController.register)

routes.post("/login",UserController.login)

routes.use(productRoutes)


module.exports = routes
