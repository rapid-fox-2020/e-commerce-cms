const jwt = require('jsonwebtoken');

const secretKey = process.env.Secret

function encode(obj){
  return jwt.sign(obj, secretKey)
}

function decode(accessToken){
  try {
    var decoded = jwt.verify(accessToken, secretKey);
    return decoded
  } catch(err) {
    return err
  }
}



module.exports = { encode, decode }
