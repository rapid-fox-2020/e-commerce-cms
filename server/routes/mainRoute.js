const router = require('express').Router()
const mainController = require('../controllers/mainController')
const products = require('./products')

router.post('/login', mainController.login)


router.use('/products', products)

module.exports = router