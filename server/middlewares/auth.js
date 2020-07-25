const jwt = require(`jsonwebtoken`)
const { User, Product } = require('../models')

const authentication = (req, res, next) => {
    const { access_token } = req.headers
    // console.log(`>>>>>>>>>>>>><<<<<`, access_token)

    if (!access_token) {
        res.status(404).json({ message: `user not found` })
    }

    let decode = jwt.verify(access_token, process.env.SECRET)
    req.userData = decode

    console.log(decode, `<<<<<<<<<<<<<<<<<<<<<<<<`)

    User.findByPk(req.userData.id)
        .then(data => {
            if (data) {
                next()
            } else {
                res.status(404).json({ message: 'user not found' })
            }
        })
        .catch(err => {
            res.status(403).json({ message: 'authentication failed' })
        })
}

const authorization = (req, res, next) => {
    const email = req.userData.email

    User.findOne({
        where: {
            email
        }
    })
        .then(user => {
            if (!user) {
                res.status(404).json(`user not found`)
            } else {
                if (user.role === 'admin') {
                    next()
                } else {
                    res.status(403).json(`you are not authorized`)
                }
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
}

module.exports = { authentication, authorization }