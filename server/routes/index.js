const router = require('express').Router()
const productRoutes = require('./productRoutes')
const UserController = require('../controllers/UserController')
const errorHandle = require('../midlewares/errorhandler')
const errorHandler = require('../midlewares/errorhandler')
const authentication = require('../midlewares/authentication')

router.get('/', (req, res) => {
    res.send(`Welcome bruh`)
})
router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.use(authentication)
router.use('/products',productRoutes)
router.use(errorHandler)

module.exports = router