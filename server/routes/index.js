"use strict"

const routes = require('express').Router();
const userRouter = require('../routes/userRouter')
const productRouter = require('../routes/productRouter')

routes.use('/users', userRouter)
routes.use('/products', productRouter)


module.exports = routes