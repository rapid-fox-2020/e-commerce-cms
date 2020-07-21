const { decode } = require('../helpers/jwt')

function authentication (req, res, next) {
    try {
        req.userData = decode(req.headers.access_token)
        User.findByPk(req.userData.id)
        .then( data => {
            next()
        })
        .catch( err => {
            res.status(404).json({error: "unauthenticated"})
        })
    } catch {
        res.status(401).json({error: "wrong access token"})
    }
}

module.exports = authentication