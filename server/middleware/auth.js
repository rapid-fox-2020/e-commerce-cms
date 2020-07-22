const { decode } = require('../helper/jwt')
const { User } = require('../models')

async function authentication (req, _, next) {
    let { access_token } = req.headers
    
    try {
        const decoded = decode(access_token)
        const { id } = decoded
        const user = await User.findByPk(id)
        
        if (user.role === 'admin') {
            next()
        } else {
            throw {status: 400, name: "ErrorValidation", message:"Authentication failed User"}
        }
    } catch (err) {
        next(err)
    }
}

module.exports = { authentication }