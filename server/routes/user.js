const router = require('express').Router()
const usersController = require('../controllers/usersController')


router.use ('/register',usersController.register)
router.use('/login', usersController.login)


module.exports = router