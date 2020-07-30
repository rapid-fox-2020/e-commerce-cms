"use strict"

const routes = require('express').Router();
const UserController = require('../controllers/UserController')

routes.post('/login', UserController.login)

module.exports = routes