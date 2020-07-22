const router = require('express').Router()
const productController = require('../controllers/ProductController')
const { authentication } = require('../middleware/auth')

router.use(authentication)
router.get('/', productController.getProducts)
router.post('/', productController.addPost)
router.get('/:id', productController.getProductById)
router.put('/:id', productController.update)
router.delete('/:id', productController.destroy)

module.exports = router