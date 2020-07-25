const JWT = require('jsonwebtoken');


let generate = data => JWT.sign(data, process.env.SECRET)
let decode = data => JWT.verify(data, process.env.SECRET)

module.exports = { generate, decode }