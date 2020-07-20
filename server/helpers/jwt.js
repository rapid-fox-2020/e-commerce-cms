const jwt = require('jsonwebtoken');

module.exports = {
  encode(data) {
    return jwt.sign(data, process.env.SECRET);
  },
  decode(token) {
    return jwt.verify(token, process.env.SECRET)
  }
}