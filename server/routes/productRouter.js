"use strict"

const routes = require('express').Router();
const ProductController = require('../controllers/ProductController')
const {authentication, authorization} = require('../middlewares/auth')

routes.get('/', authentication, authorization, ProductController.show)
routes.post('/', authentication, authorization, ProductController.add)
routes.get('/:id', authentication, authorization, ProductController.getId)
routes.put('/:id', authentication, authorization, ProductController.edit)
routes.delete('/:id', authentication, authorization, ProductController.delete)

module.exports = routes