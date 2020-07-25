const routes = require('express').Router()
const user = require('./user')
const product = require('./product')

routes.get('/', function(req,res){res.send('hi')})
routes.use('/',user)
routes.use('/products',product)

module.exports = routes