const router = require('express').Router()
const Product = require('../controllers/ProductController')
const { authorization, authentication } = require('../middlewares/auth')


router.use(authentication)
router.get('/', Product.listProduct)
router.get('/:id', Product.productById)
router.put('/:id', authorization, Product.updateProduct)
router.post('/', authorization, Product.postProduct)
router.delete('/:id', authorization, Product.deleteProduct)

module.exports = router