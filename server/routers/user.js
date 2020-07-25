const router = require('express').Router()
const User = require(`../controllers/UserController`)

router.post('/login', User.login)

module.exports = router