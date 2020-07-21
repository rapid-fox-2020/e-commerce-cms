const router = require('express').Router()
const productsController = require('../controllers/productsController')
const { authentication } = require('../middlewares/auth')


router.use(authentication)
router.get('/', productsController.view)
router.get('/:id', productsController.viewByPk)
router.post('/', productsController.add)
router.put('/:id', productsController.update)
router.delete('/:id', productsController.delete)
// router.post('/login', productsController.login)
// router.post('/login', productsController.login)


module.exports = router