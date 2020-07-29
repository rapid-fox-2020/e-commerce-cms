const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

function encode(params) {
  return jwt.sign(params, secret)
}

function decode(token) {
  return jwt.verify(token, secret)
}

module.exports = { encode, decode }