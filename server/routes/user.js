const routes = require('express').Router()
const UserController = require('../controller/UserController')

routes.post('/login', UserController.login)
routes.post('/register', UserController.register)

module.exports = routes