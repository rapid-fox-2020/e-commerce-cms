const router = require('express').Router()
const userController = require('../controllers/userController')
const productsController = require('../controllers/productsController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')


router.post('/login', userController.userLogin)

router.use(authentication)
router.use(authorization)
router.post('/products', productsController.createProduct)
router.get('/products', productsController.getAllProduct)
router.get('/products/:id', productsController.getOneProduct)
router.put('/products/:id', productsController.updateProduct)
router.delete('/products/:id', productsController.deleteProduct)


module.exports = router