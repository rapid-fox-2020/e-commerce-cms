const router = require('express').Router()
const ProductController = require('../controllers/ProductController')

router.get('/', ProductController.list)
router.post('/', ProductController.create)
router.put('/id', ProductController.edit)
router.delete('/id', ProductController.edit)
router.get('/id', ProductController.findOne)

module.exports = router