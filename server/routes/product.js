const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const {authentication,authorizationAdmin} = require('../middlewares/auth')

router.use(authentication)

router.get('/',ProductController.showAll)

router.use(authorizationAdmin)

router.post('/',ProductController.addProduct)
router.put('/:id',ProductController.editProduct)
router.delete('/:id',ProductController.deleteProduct)

module.exports = router