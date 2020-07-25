const routes = require('express').Router();
const productRoutes = require('./ProductRoutes');
const Controller = require('../controllers/UserController')

routes.post('/login', Controller.login)
    // routes.post('/register', Controller.register)

routes.use('/products', productRoutes)



module.exports = routes;