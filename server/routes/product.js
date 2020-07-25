const router = require('express').Router()
const ProductController = require('../controller/ProductController')
const {authentication, authorization} = require('../middleware/auth')


router.use(authentication)
router.post('/', ProductController.addProduct)
router.get('/',ProductController.List)
router.get('/:id', authorization,ProductController.ListbyID)
router.put('/:id', authorization,ProductController.updateProduct)
router.delete('/:id', authorization, ProductController.deleteColumn)


module.exports = router