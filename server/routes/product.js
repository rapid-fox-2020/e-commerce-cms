const router = require('express').Router()
const productsController = require('../controllers/productsController')
const auhtentication = require('../middlewares/auhtentication')
const authorization = require('../middlewares/authorization')

router.use(auhtentication)
router.get('/', authorization, productsController.getAll)
router.post('/', authorization, productsController.add)
router.put('/:id', authorization, productsController.update)
router.delete('/:id', authorization, productsController.delete)

module.exports = router