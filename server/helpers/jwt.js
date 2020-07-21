const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

const encode = (data) => {
    return jwt.sign(data, secret);
}

const decode = (token) => {
    return jwt.verify(token, secret);
}

module.exports = {encode, decode}