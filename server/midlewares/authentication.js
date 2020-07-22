const { User } = require('../models')
const { decode } = require('jsonwebtoken')

function authentication (req, res, next) {
    try {
        if (req.headers.access_token) {
            let verify = decode(req.headers.access_token)
            // console.log(verify)
            User.findByPk(verify.id)
                .then((data) => {
                    // console.log('>>>>>'.data);
                    req.UserId = data.id
                    console.log('success auth');
                    next()
                })
                .catch(err => {
                    next (err)
                })
        }
    } catch {
        next({ name: 'Unauthenticated' })
    }

}

module.exports = authentication