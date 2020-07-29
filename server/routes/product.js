const router = require('express').Router()
const productsController = require('../controllers/productsController')
const auhtentication = require('../middlewares/auhtentication')
const authorization = require('../middlewares/authorization')

router.use(auhtentication)
router.use(authorization)
router.get('/', productsController.getAll)
router.post('/', productsController.add)
router.put('/:id', productsController.update)
router.delete('/:id', productsController.delete)


module.exports = router